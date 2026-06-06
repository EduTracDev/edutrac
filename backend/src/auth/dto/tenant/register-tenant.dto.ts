import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterTenantDto{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(8)
    password: string

    @IsString()
    @MinLength(8)
    passwordConfirm: string

    @IsNotEmpty()
    @IsString()
    organisation_name: string

    @IsNotEmpty()
    packagePlanId: number
}

export class BrandingSetupDto{
    
}

export class CompleteSetupDto{

}