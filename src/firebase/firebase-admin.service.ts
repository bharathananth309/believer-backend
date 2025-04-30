import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../firebase-service-account.json';

@Injectable()
export class FirebaseAdminService {
  private firebaseApp: admin.app.App;

  constructor() {
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  async verifyToken(idToken: string) {
    try {
      return await this.firebaseApp.auth().verifyIdToken(idToken);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
