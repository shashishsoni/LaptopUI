const fs = require('fs');
const path = require('path');

function copyPrismaEngine() {
  const sourcePath = path.join(process.cwd(), 'node_modules', '.prisma', 'client', 'query_engine-windows.dll.node');
  const destPath = path.join(process.cwd(), '.next', 'server', 'query_engine-windows.dll.node');

  try {
    // Create the destination directory if it doesn't exist
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    
    // Copy the engine file
    fs.copyFileSync(sourcePath, destPath);
    console.log('Successfully copied Prisma engine');
  } catch (error) {
    console.error('Error copying Prisma engine:', error);
    process.exit(1);
  }
}

copyPrismaEngine(); 