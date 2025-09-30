import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto'

export interface TokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(private configService: ConfigService) {
    this.accessSecret = this.configService.get<string>('ACCESS_TOKEN', '');
    // this.refreshSecret = this.configService.get<s tring>('REFRESH_TOKEN', '');

    if (!this.accessSecret || !this.refreshSecret) {
      throw new Error('JWT secrets are not set in environment variables');
    }
  }

  signAccessToken(userId: string) {
    return jwt.sign({ userId }, this.accessSecret, { expiresIn: '15m' });
  }

  signRefreshToken() {
    //return jwt.sign({ userId }, this.refreshSecret, { expiresIn: '7d' });
    return randomBytes(64).toString('hex')
  }

  verifyToken(token: string, type: 'access' | 'refresh'): TokenPayload {
    //const secret = type === 'access' ? this.accessSecret : this.refreshSecret;

    try {
      const payload = jwt.verify(token, this.accessSecret);
      if (typeof payload === 'string' || !('userId' in payload)) {
        throw new UnauthorizedException('Invalid token payload');
      }
      return payload as TokenPayload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

