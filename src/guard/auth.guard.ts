import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
import { TToken } from 'type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly prismaService:PrismaService){}
  async canActivate(
    context: ExecutionContext,
  ) {
    const roles = this.reflector.getAllAndOverride('roles',[
        context.getHandler(),
        context.getClass()
    ])
    if(!roles) return true
    try {
        let req = context.switchToHttp().getRequest()
        const token = req.headers?.authorization?.split('Bearer ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN) as TToken
        if (Date.now() > decodedToken.exp) throw new UnauthorizedException()
        const userInToken = decodedToken.data
        const userInDatabase = await this.prismaService.user.findFirst({
            where:{
                id: userInToken.id,
                is_delete: false
            }
        })
        if(!userInDatabase) throw new UnauthorizedException()
        if(roles.includes(userInDatabase.userType)) return true
        return false;
    }
    catch {
        throw new UnauthorizedException()
    }
  }
}