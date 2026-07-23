import { IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class UpdateParentDto {
    @IsOptional()
    @IsPhoneNumber('NG')
    contactNumber?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    address?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    lastName?: string;
}