import firebaseAdmin from 'firebase-admin';

import { env } from '../config/env';

const { credential } = env.firebase;

export const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(credential),
});
