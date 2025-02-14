const { execSync } = require('child_process');
const path = require('path');

try {
  // Clean up existing Prisma files
  execSync('rm -rf node_modules/.prisma');
  execSync('rm -rf node_modules/@prisma');
  
  // Generate Prisma client with error handling
  execSync('npx prisma generate --schema=./src/server/prisma/schema.prisma', {
    stdio: 'inherit',
    env: {
      ...process.env,
      PRISMA_SCHEMA_ENGINE_BINARY: path.join(__dirname, '../node_modules/prisma-engines/schema-engine'),
      PRISMA_QUERY_ENGINE_BINARY: path.join(__dirname, '../node_modules/prisma-engines/query-engine'),
      PRISMA_QUERY_ENGINE_LIBRARY: path.join(__dirname, '../node_modules/prisma-engines/query-engine-windows.dll.node')
    }
  });
} catch (error) {
  console.error('Prisma initialization error:', error);
  // Don't exit with error code to allow build to continue
  process.exit(0);
} 