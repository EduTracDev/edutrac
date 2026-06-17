import { IsNumber, IsNotEmpty } from 'class-validator';

export class ResendInvitationDto {
    @IsNumber()
    @IsNotEmpty()
    invitationId: number;

    @IsNumber()
    @IsNotEmpty()
    invitedBy: number;
}