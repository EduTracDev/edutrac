import { Controller, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CreateUserInvitationDto, AcceptUserInvitationDto, AcceptUserInvitationGoogleDto, ResendInvitationDto } from '../dto';
import { InvitationService } from '../services/invitation.service';


@Controller('invitation')
export class InvitationController {
    constructor(private invitationService: InvitationService) { }


    @Post(':tenantId')
    async createInvitaion(@Body() dto: CreateUserInvitationDto, @Param('tenantId', ParseIntPipe) tenantId: number) {
        return this.invitationService.inviteUser(dto, tenantId);
    }

    @Post('validate')
    async validate(@Query('token') token: string) {
        return this.invitationService.validateInvitation(token);
    }

    @Post('accept')
    accept(@Body() dto: AcceptUserInvitationDto) {
        return this.invitationService.acceptInvitation(dto);
    }

    @Post('accept/google')
    async acceptInvitationViaGoogle(@Body() dto: AcceptUserInvitationGoogleDto) {
        return this.invitationService.acceptInvitationViaGoogle(dto);
    }

    @Post('resend')
    async resendInvitation(@Body() dto: ResendInvitationDto) {
        return this.invitationService.resendInvitation(dto);
    }
}