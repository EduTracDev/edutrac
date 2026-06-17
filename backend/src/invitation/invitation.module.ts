import { Module } from '@nestjs/common';
import { InvitationController } from './controllers/invitation.controller';
import { InvitationService } from './services/invitation.service';
import { TokenService } from '../auth/services/token.service';
import { AuthService } from '../auth/services/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { OAuthStateService } from 'src/auth/services/oauthstate.service';
import { GoogleAuthService } from './services/googleAuthService.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { TenantModule } from '../tenant/tenant.module';
import { MailModule } from '../mail/mail.module';
import {ProfileFactory} from './services/invitation-profile.factory';

@Module({
  imports: [JwtModule, AuthModule, TenantModule, MailModule],
  controllers: [InvitationController],
  providers: [InvitationService, TokenService, AuthService, OAuthStateService, PrismaService, MailService, GoogleAuthService, ProfileFactory]
})
export class InvitationModule { }