import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthStateService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: {
    action: string;
    tenantDomain?: string;
    schoolName?: string;
  }) {
    return this.jwtService.sign(payload, {
      secret: process.env.OAUTH_STATE_SECRET,
      expiresIn: '10m',
    });
  }

  verify(state: string) {
    return this.jwtService.verify(state, {
      secret: process.env.OAUTH_STATE_SECRET,
    });
  }
}