import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'

type TToken = {
    exp: number,
    data: {id: number, email: string},
    iat: number
}

@Injectable()
export class AddUserIntoHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let req = context.switchToHttp().getRequest()
    const token = req.headers?.authorization?.split('Bearer ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN) as TToken
      if(Date.now() < decodedToken.exp) {
          req.user = decodedToken.data
      } else {
          req.user = false;
      }
    }
    catch {
      req.user = false;
    }
    return next
      .handle()
  }
}