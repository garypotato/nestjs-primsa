import { Body, Controller, Get, Param, ParseEnumPipe, Post, Put, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { EUserType } from '@prisma/client';
import { CreateUserDto, GenerateKeyDto, SignInDto, UpdateUserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { GetUser } from 'src/decorators/getUser.decorator';
import { TUserInReq } from 'type';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService){}

  @Post('/genkey/:userType')
  generateKey(@Param('userType', new ParseEnumPipe(EUserType)) userType:EUserType, @Body() {email, name}: GenerateKeyDto) {
    return this.userService.generateKey({email, name, userType});
  }

  @Post('/signup/:userType')
  async signUp(@Param('userType', new ParseEnumPipe(EUserType)) userType: EUserType, @Body() body:CreateUserDto) {
    if(userType !== 'BUYER') {
      if(!body.productKey) throw new UnauthorizedException()
      const keyString = `${body.email}-${body.name}-${userType}-${process.env.PRODUCT_KEY}`
      const isValidKey = await bcrypt.compare(keyString, body.productKey)

      if(!isValidKey) throw new UnauthorizedException()
    }
    return this.userService.signUp(body, userType)
  }

  @Post('/signin')
  signIn(@Body() body: SignInDto) {
    return this.userService.signIn(body)
  }

  @Get('/me')
  getMe(@GetUser('user') user:TUserInReq) {
    if(!user) throw new RequestTimeoutException()
    return this.userService.getMe(user);
  }

  @Put('/update')
  updateUser(@Body() body: UpdateUserDto, @GetUser('user') user:TUserInReq) {
    return this.userService.updateUser(body, user)
  }

  @Put('/delete')
  deleteUser(@GetUser('user') user:TUserInReq){
    return this.userService.deleteUser(user)
  }
}
