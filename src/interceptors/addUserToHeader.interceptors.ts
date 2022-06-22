import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, ConflictException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
import { TUserInReq } from 'type';

type TToken = {
    exp: number,
    data: TUserInReq,
    iat: number
}

@Injectable()
export class AddUserIntoHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let req = context.switchToHttp().getRequest()
    const token = req.headers?.authorization?.split('Bearer ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN) as TToken
      if (Date.now() > decodedToken.exp) throw new UnauthorizedException()
      req.user = decodedToken.data
      return next
      .handle()
    }
    catch {
      return next
      .handle()
    }
  }
}