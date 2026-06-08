import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import {UserAuthController} from './controllers/user-auth.controller';
import {TenantAuthController} from './controllers/tenant-auth.controller';
import { TokenService } from './services/token.service';
import { RolesService } from './services/roles.service';
import { TenantModule } from '../tenant/tenant.module';

@Module({
  imports: [JwtModule.register({}), MailModule, TenantModule],
  controllers: [UserAuthController, TenantAuthController],
  providers: [AuthService, TokenService, JwtStrategy, RolesService]
})
export class AuthModule { }