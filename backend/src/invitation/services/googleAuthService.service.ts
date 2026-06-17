import {Injectable} from '@nestjs/common';
import {OAuth2Client} from 'google-auth-library';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GoogleAuthService{
    constructor(){}
    async verifyGoogleToken(googleToken: string){
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            if(!payload) throw new UnauthorizedException("Invalid google token"); 
            const { given_name, family_name, email, sub } = payload;
            return { given_name, family_name, email, sub };
        } catch(error){
            throw new UnauthorizedException('Google authentication failed');
        }
    }
}