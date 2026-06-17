import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import {Request} from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy( Strategy, 'google'){
  constructor(
    private authService: AuthService,
  ){
    super({
      passReqToCallback: true,
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      const user = await this.authService.validateSocialUser(req, profile);
      return user
    } catch(error){
      throw error
    }
  }
}