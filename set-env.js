import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Definindo __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define o caminho da pasta e arquivo
const targetDir = resolve(__dirname, './src/app/environments');
const targetPath = resolve(targetDir, 'environment.prod.ts');

// Cria o diretório caso não exista
mkdirSync(targetDir, { recursive: true });

// Lista das variáveis que você espera
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MSG_SENDER_ID',
  'FIREBASE_APP_ID',
  'FIREBASE_MEASUREMENT_ID',
];

// Valida se todas as variáveis existem e captura seus valores
const envVars = {};

for (const key of requiredEnvVars) {
  const value = process.env[key];
  if (!value) {
    console.error(`❌ ERRO: Variável de ambiente ${key} não está definida!`);
    process.exit(1);
  }
  envVars[key] = value;
}

// Gera o conteúdo do arquivo environment.prod.ts
const envConfig = `
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: '${envVars['FIREBASE_API_KEY']}',
    authDomain: '${envVars['FIREBASE_AUTH_DOMAIN']}',
    projectId: '${envVars['FIREBASE_PROJECT_ID']}',
    storageBucket: '${envVars['FIREBASE_STORAGE_BUCKET']}',
    messagingSenderId: '${envVars['FIREBASE_MSG_SENDER_ID']}',
    appId: '${envVars['FIREBASE_APP_ID']}',
    measurementId: '${envVars['FIREBASE_MEASUREMENT_ID']}',
  }
};
`;

// Escreve o arquivo
writeFileSync(targetPath, envConfig);

console.log('✅ environment.prod.ts criado com sucesso!');
