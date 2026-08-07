import { IsNotEmpty, IsString } from 'class-validator';

export class AcceptUserInvitationGoogleDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  googleToken: string;
}
