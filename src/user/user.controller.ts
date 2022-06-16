import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('/signup')
  signUp() {
    return 'sign up';
  }

  @Post('/signin')
  signIn() {
    return 'sign in';
  }

  @Post('/genkey')
  generateKey() {
    return 'generate key';
  }

  @Get('/me')
  getMe() {
    return 'get me';
  }
}
