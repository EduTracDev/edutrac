import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class resendVerificationEmailDto{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    redirectUrl?: string;
}