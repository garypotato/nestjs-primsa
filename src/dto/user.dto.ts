import { EUserType } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class GenerateKeyDto {
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    name: string
}

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    name: string

    @MinLength(5)
    @IsString()
    password: string

    @Matches(/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/, {
        message: 'phone must be a valid phone number'
    })
    phone: string

    @IsString()
    @IsOptional()
    productKey?: string
}

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class GetUserRespondDto {
    email: string
    name: string
    phone: string
    userType: EUserType
    @Exclude()
    password: string
    @Exclude()
    create_at: Date
    @Expose({name:'createAt'})
    createAt(){
        return this.create_at
    }
    @Exclude()
    update_at: Date
    @Expose({name:"updateAt"})
    updateAt(){
        return this.update_at
    }
    @Exclude()
    is_delete: boolean

    constructor(partial: Partial<GetUserRespondDto>){
        Object.assign(this, partial)
    }
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string

    @MinLength(5)
    @IsString()
    @IsOptional()
    password?: string

    @Matches(/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/, {
        message: 'phone must be a valid phone number'
    })
    @IsOptional()
    phone?: string
}