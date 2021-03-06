import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EUserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { GetUserRespondDto } from 'src/dto/user.dto';
import { TUserInReq } from 'type';

type TGenerateKeyParams = {
    email: string
    name: string
    userType: EUserType
}

type TSignUpParams = {
    email: string
    name: string
    phone: string
    password: string
    product?: string
}

type TSignInParams = {
    email: string
    password: string
}

type TGetMeParams = {
    id: number
    email: string
}

type TUpdateUserParams = {
    name?: string
    phone?: string
    password?: string
}

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService){}

    generateKey({email, name, userType}:TGenerateKeyParams) {
        const keyString = `${email}-${name}-${userType}-${process.env.PRODUCT_KEY}`
        return bcrypt.hash(keyString, 10)
    }

    async signUp(body:TSignUpParams, userType:EUserType) {
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const isUserExit = await this.prismaService.user.findUnique({
            where: {
                email: body.email
            }
        })
        if(isUserExit) throw new ConflictException()

        const user = await this.prismaService.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword,
                phone: body.phone,
                userType: userType
            }
        })
        const token = this.generateJWT(user.id, user.email)
        return token
    }

    async signIn({email, password}:TSignInParams) {
        const user = await this.prismaService.user.findFirst({
            where: {
                email,
                is_delete: false
            }
        })
        if(!user) throw new NotFoundException()

        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) throw new UnauthorizedException()

        return this.generateJWT(user.id, email)
    }

    async getMe({id,email}: TGetMeParams){
        const user = await this.prismaService.user.findFirst({
            where: {
                id,
                email
            },
            select: {
                email:true,
                name: true,
                phone: true,
                userType: true,
                create_at: true,
                update_at: true
            }
        })
        if(!user) throw new NotFoundException()

        return new GetUserRespondDto(user)
    }

    async updateUser(body: TUpdateUserParams, userInfo: TUserInReq){
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const updateInfo = {
            ... body.name && {name: body.name},
            ... body.phone && {phone: body.phone},
            ... body.password && {password: hashedPassword}
        }
        const updatedUser = await this.prismaService.user.update({
            where: {
                id: userInfo.id
            },
            data: updateInfo
        })
        return new GetUserRespondDto(updatedUser)
    }

    async deleteUser(userInfo: TUserInReq){
        const deletedUser = await this.prismaService.user.update({
            where: {
                id: userInfo.id
            }, 
            data: {
                is_delete: true
            }
        })
        return new GetUserRespondDto({name:deletedUser.name, email:deletedUser.email})
    }

    private generateJWT = (id, email) => {
        const t = new Date().setHours(27,0,0,0);
        return jwt.sign({
            exp: t,
            data: {id, email}
        }, process.env.JWT_TOKEN
        )
    }
}
