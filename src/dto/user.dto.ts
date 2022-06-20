import { EUserType } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

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
}

export class GenerateKey {
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    name: string
}