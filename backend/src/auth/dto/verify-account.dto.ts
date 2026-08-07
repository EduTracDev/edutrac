import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TenantModule } from 'src/tenant/tenant.module';

export class VerifyAccountDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
TenantModule;
