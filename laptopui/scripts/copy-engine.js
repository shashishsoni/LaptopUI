const fs = require('fs');
const path = require('path');

function copyPrismaEngine() {
  // Determine platform-specific engine extension
  const platform = process.platform;
  let engineFile;
  
  switch (platform) {
    case 'win32':
      engineFile = 'query_engine-windows.dll.node';
      break;
    case 'linux':
      engineFile = 'libquery_engine-debian-openssl-3.0.x.so.node';
      break;
    case 'darwin':
      engineFile = 'libquery_engine-darwin.dylib.node';
      break;
    default:
      engineFile = 'libquery_engine-debian-openssl-3.0.x.so.node';
  }

  const sourceDir = path.join(process.cwd(), 'node_modules/.prisma/client');
  const targetDir = path.join(process.cwd(), '.next/server');

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const sourcePath = path.join(sourceDir, engineFile);
  const targetPath = path.join(targetDir, engineFile);

  // Only copy if source exists
  if (fs.existsSync(sourcePath)) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Successfully copied Prisma engine: ${engineFile}`);
    } catch (error) {
      console.error('Error copying file:', error);
      // Don't exit with error - allow build to continue
    }
  } else {
    console.log(`Prisma engine file not found: ${engineFile}`);
    // Don't exit with error - allow build to continue
  }
}

try {
  copyPrismaEngine();
} catch (error) {
  console.error('Error in copy-engine script:', error);
  // Don't exit with error - allow build to continue
  process.exit(0);
} 