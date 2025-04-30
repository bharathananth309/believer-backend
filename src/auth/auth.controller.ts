// src/auth/auth.controller.ts
import { Controller, Post, Headers, Get } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseAdminService) {}

  @Post('verify-token')
  async verifyToken(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split('Bearer ')[1];
    if (!token) {
      return { error: 'No token provided' };
    }

    const decoded = await this.firebaseService.verifyToken(token);
    return {
      uid: decoded.uid,
      email: decoded.email,
    };
  }
}
