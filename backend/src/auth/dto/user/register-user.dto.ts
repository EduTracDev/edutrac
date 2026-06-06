import {IsString, IsNotEmpty, IsEmail, MinLength} from 'class-validator';

export class RegisterUserDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    passwordConfirm: string

    @IsNotEmpty()
    tenantId: number

    @IsNotEmpty()
    @IsString()
    fistName?: string

    @IsNotEmpty()
    @IsString()
    lastName?: string
}