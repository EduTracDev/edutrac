import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { MailModule } from '../mail/mail.module';
import { UserAuthController } from './controllers/user-auth.controller';
import { TenantAuthController } from './controllers/tenant-auth.controller';
import { OAuthController } from './controllers/oauth.controller';
import { TokenService } from './services/token.service';
import { RolesService } from './services/roles.service';
import { TenantModule } from '../tenant/tenant.module';
import { OAuthStateService } from './services/oauthstate.service';

@Module({
  imports: [JwtModule.register({}), MailModule, TenantModule],
  controllers: [UserAuthController, TenantAuthController, OAuthController],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    GoogleStrategy,
    RolesService,
    OAuthStateService,
  ],
})
export class AuthModule {}
