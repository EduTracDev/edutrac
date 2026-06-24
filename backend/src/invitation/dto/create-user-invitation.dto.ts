import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { InvitationType } from 'src/generated/prisma/enums';

export class CreateUserInvitationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  adminUserId: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(InvitationType)
  invitationType: InvitationType;
}
