import {IsEmail, IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator';

export class ForgotPasswordDto{
    @IsEmail()
    @IsNotEmpty({message: "Email is required"})
    @IsString()
    email: string;

    @IsNotEmpty({message: "Tenant ID is required"})
    @IsNumber()
    tenantId: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: "New password must be at least 8 characters"})
    newPassword: string

    @IsString()
    @IsNotEmpty({message: "Password confirmation is required"})
    @MinLength(8)
    passwordConfirm: string
}