import {Injectable} from '@nestjs/common';

@Injectable()
export class GoogleAuthService{
    constructor(){}

    async verifyGoogleToken(googleToken: string){
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${googleToken}`
            }
        });
        if(!res.ok) return null;

        return res.json();
    }
}