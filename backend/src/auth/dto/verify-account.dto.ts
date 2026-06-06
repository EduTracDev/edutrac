import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyAccountDto{
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    redirectUrl?: string;
}