import { Controller, Post, Body, Param, ParseIntPipe, Query, Req} from '@nestjs/common';
import {
  CreateUserInvitationDto,
  AcceptUserInvitationDto,
  AcceptUserInvitationGoogleDto,
  ResendInvitationDto,
} from '../dto';
import { InvitationService } from '../services/invitation.service';
import { Tenant } from 'src/core/decorators/get-tenant.decorator';
import { UnauthorizedException } from '@nestjs/common';

@Controller('invitation')
export class InvitationController {
  constructor(private invitationService: InvitationService) {}

  /*
    send invitaion to Admin, Teacher, Parent
*/
  @Post('')
  async createInvitation(@Req() req, @Tenant() tenant,@Body() dto: CreateUserInvitationDto) {
    //Temporary check, permission checks would be implemented shortly
    if (req.user.userRole !== "Admin") throw new UnauthorizedException("You are unauthorised for this action");
    return this.invitationService.inviteUser(dto, tenant.id, tenant.school_name, req.user.id);
  }

  /*
    Validate invitation token
*/
  @Post('validate')
  async validate(@Query('token') token: string) {
    return this.invitationService.validateInvitation(token);
  }

  /*
    Accept invitation
*/
  @Post('accept')
  accept( @Tenant() tenant, @Body() dto: AcceptUserInvitationDto ) {
    return this.invitationService.acceptInvitation(dto, tenant);
  }

  /*

*/
  @Post('accept/google')
  async acceptInvitationViaGoogle(
    @Tenant() tenant,
    @Body() dto: AcceptUserInvitationGoogleDto,
  ) {
    return this.invitationService.acceptInvitationViaGoogle(dto, tenant);
  }

  @Post('resend')
  async resendInvitation(@Req() req, @Tenant() tenant, @Body() dto: ResendInvitationDto) {
    return this.invitationService.resendInvitation(dto, tenant.id, req.user.id);
  }
}
