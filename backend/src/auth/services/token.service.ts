import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class TokenService {
  generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
