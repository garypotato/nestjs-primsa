import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AddUserIntoHeaderInterceptor } from './interceptors/addUserToHeader.interceptors';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: AddUserIntoHeaderInterceptor
  }],
})
export class AppModule {}
