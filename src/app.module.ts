import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AddUserIntoHeaderInterceptor } from './interceptors/addUserToHeader.interceptors';
import { FileUploadModule } from './file-upload/file-upload.module';
import { PropertyModule } from './property/property.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [UserModule, PrismaModule, FileUploadModule, PropertyModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: AddUserIntoHeaderInterceptor
  },{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
