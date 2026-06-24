import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  CreateUserInvitationDto,
  AcceptUserInvitationDto,
  AcceptUserInvitationGoogleDto,
  ResendInvitationDto,
} from '../dto';
import { InvitationService } from '../services/invitation.service';
import { Tenant } from 'src/core/decorators/get-tenant.decorator';

@Controller('invitation')
export class InvitationController {
  constructor(private invitationService: InvitationService) {}

  /*
    send invitaion to Admin, Teacher, Parent
*/
  @Post('')
  async createInvitation(
    @Tenant() tenant,
    @Body() dto: CreateUserInvitationDto,
  ) {
    return this.invitationService.inviteUser(dto, tenant);
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
  async resendInvitation(@Tenant() tenant, @Body() dto: ResendInvitationDto) {
    return this.invitationService.resendInvitation(dto, tenant);
  }
}
