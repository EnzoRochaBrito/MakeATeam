import { writeFileSync } from 'fs';
import { resolve } from 'path';

const targetPath = resolve(__dirname, './src/environments/environment.prod.ts');

const envConfig = `
export const environment = {
  production: true,
  firebase: {
    apiKey: '${process.env['FIREBASE_API_KEY']}',
    authDomain: '${process.env['FIREBASE_AUTH_DOMAIN']}',
    projectId: '${process.env['FIREBASE_PROJECT_ID']}',
    storageBucket: '${process.env['FIREBASE_STORAGE_BUCKET']}',
    messagingSenderId: '${process.env['FIREBASE_MSG_SENDER_ID']}',
    appId: '${process.env['FIREBASE_APP_ID']}',
    measurementId: '${process.env['FIREBASE_MEASUREMENT_ID']}'
  }
};
`;

writeFileSync(targetPath, envConfig);
console.log(`✅ Firebase environment variables written to environment.prod.ts`);
