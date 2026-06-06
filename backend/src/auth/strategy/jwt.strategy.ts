import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt'
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(config: ConfigService, private prisma: PrismaService){
        const secretKey = config.get("JWT_SECRET");
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey
        })
    }


  async validate(payload: {sub: number, email:string}) {
    const user = await this.prisma.user.findUnique({
      where:{
        id: payload.sub
      } 
    })
    if (!user) return null
    const {password_hash, ...res} = user;
    return res;
  }

}