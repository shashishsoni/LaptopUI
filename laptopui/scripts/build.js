const { execSync } = require('child_process');

try {
  console.log('Installing frontend dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Generating Prisma Client...');
  execSync('npx prisma generate --schema=./src/server/prisma/schema.prisma', { stdio: 'inherit' });

  console.log('Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Installing backend dependencies...');
  execSync('cd src/server && npm install', { stdio: 'inherit' });

  console.log('Building backend...');
  execSync('cd src/server && npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 