import { IsOptional, IsString, IsEmail } from 'class-validator';

export class AccountInfoDto {
  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  contactAddress?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;
}