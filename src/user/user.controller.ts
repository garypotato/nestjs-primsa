import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EUserType } from '@prisma/client';
import { GenerateKey } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  @Post('/signup:/userType')
  signUp() {
    return 'sign up';
  }

  @Post('/signin')
  signIn() {
    return 'sign in';
  }

  @Post('/genkey/:userType')
  generateKey(@Param() userType: EUserType, @Body() {email, name}: GenerateKey) {
    return userType;
  }

  @Get('/me')
  getMe() {
    return 'get me';
  }
}
