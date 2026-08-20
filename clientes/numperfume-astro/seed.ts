/**
 * Firebase Auth Seed Script
 * 
 * Run with: bun run seed
 * 
 * Requires FIREBASE_SERVICE_ACCOUNT_KEY environment variable
 * or serviceAccountKey.json in the project root.
 * 
 * Get the service account key from:
 * Firebase Console > Project Settings > Service accounts > Generate new private key
 */

import { initializeApp, cert, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const users = [
  { email: 'admin@numperfume.com', password: 'Admin123!', displayName: 'Admin NUM' },
  { email: 'maria.garcia@email.com', password: 'Maria2024!', displayName: 'Maria Garcia' },
  { email: 'carlos.lopez@email.com', password: 'Carlos2024!', displayName: 'Carlos Lopez' },
  { email: 'ana.martinez@email.com', password: 'Ana2024!', displayName: 'Ana Martinez' },
  { email: 'pedro.sanchez@email.com', password: 'Pedro2024!', displayName: 'Pedro Sanchez' },
];

async function main() {
  let serviceAccount;

  const keyPath = join(process.cwd(), 'serviceAccountKey.json');
  if (existsSync(keyPath)) {
    serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'));
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  } else {
    console.error('Error: No service account key found.');
    console.error('Place serviceAccountKey.json in the project root, or set FIREBASE_SERVICE_ACCOUNT_KEY env var.');
    process.exit(1);
  }

  const app = initializeApp({
    credential: cert(serviceAccount),
  });

  const auth = getAuth(app);

  console.log('Seeding Firebase Auth users...\n');

  for (const user of users) {
    try {
      const userRecord = await auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
        emailVerified: true,
      });
      console.log(`✓ Created: ${user.email} (uid: ${userRecord.uid})`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        console.log(`- Already exists: ${user.email}`);
      } else {
        console.error(`✗ Failed: ${user.email} - ${error.message}`);
      }
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
