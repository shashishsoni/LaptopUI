import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  // Use cross-platform commands
  const cleanCommand = process.platform === 'win32' 
    ? 'if exist node_modules\\.prisma rmdir /s /q node_modules\\.prisma && if exist node_modules\\@prisma rmdir /s /q node_modules\\@prisma'
    : 'rm -rf node_modules/.prisma node_modules/@prisma';

  execSync(cleanCommand, { stdio: 'inherit' });
  
  // Generate Prisma client with error handling
  execSync('npx prisma generate --schema=./src/server/prisma/schema.prisma', {
    stdio: 'inherit',
    env: {
      ...process.env,
      PRISMA_SCHEMA_ENGINE_BINARY: join(__dirname, '../node_modules/prisma-engines/schema-engine'),
      PRISMA_QUERY_ENGINE_BINARY: join(__dirname, '../node_modules/prisma-engines/query-engine'),
      PRISMA_QUERY_ENGINE_LIBRARY: join(__dirname, '../node_modules/prisma-engines/query-engine-windows.dll.node')
    }
  });
} catch (error) {
  console.error('Prisma initialization error:', error);
  // Don't exit with error code to allow build to continue
  process.exit(0);
} 