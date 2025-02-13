const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyPrismaEngine() {
  const possibleSourcePaths = [
    path.join(process.cwd(), 'node_modules', '.prisma', 'client', 'query_engine-windows.dll.node'),
    path.join(process.cwd(), 'node_modules', 'prisma', 'query_engine-windows.dll.node'),
    path.join(process.cwd(), '.prisma', 'client', 'query_engine-windows.dll.node'),
  ];

  const destinationPaths = [
    path.join(process.cwd(), '.next', 'server', 'query_engine-windows.dll.node'),
    path.join(process.cwd(), '.prisma', 'client', 'query_engine-windows.dll.node'),
    path.join(process.cwd(), 'node_modules', '.prisma', 'client', 'query_engine-windows.dll.node'),
    path.join(process.cwd(), 'src', 'server', 'node_modules', '.prisma', 'client', 'query_engine-windows.dll.node')
  ];

  try {
    // Check for schema.prisma file
    const possibleSchemaLocations = [
      path.join(process.cwd(), 'prisma', 'schema.prisma'),
      path.join(process.cwd(), 'src', 'server', 'prisma', 'schema.prisma'),
      path.join(process.cwd(), 'schema.prisma')
    ];

    const schemaPath = possibleSchemaLocations.find(p => fs.existsSync(p));
    
    if (!schemaPath) {
      console.error('Could not find schema.prisma file. Checked locations:', possibleSchemaLocations);
      process.exit(1);
    }

    console.log('Found schema at:', schemaPath);

    // Find the first available source
    const engineSource = possibleSourcePaths.find(p => fs.existsSync(p));
    
    if (!engineSource) {
      console.log('No existing engine found. Generating with Prisma...');
      try {
        execSync(`npx prisma generate --schema="${schemaPath}"`, { 
          stdio: 'inherit',
          env: { ...process.env, PRISMA_SCHEMA_PATH: schemaPath }
        });
        
        // After generation, check again for the engine
        const newEngineSource = possibleSourcePaths.find(p => fs.existsSync(p));
        if (!newEngineSource) {
          throw new Error('Engine not found after generation');
        }
        console.log('Successfully generated Prisma engine');
      } catch (genError) {
        console.error('Error generating Prisma client:', genError);
        process.exit(1);
      }
    }

    // Create all destination directories and copy to all locations
    destinationPaths.forEach(destPath => {
      try {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(engineSource || possibleSourcePaths[0], destPath);
        console.log('Successfully copied engine to:', destPath);
      } catch (err) {
        console.warn(`Warning: Could not copy to ${destPath}:`, err.message);
      }
    });

    // Verify the copies
    const successfulCopies = destinationPaths.filter(p => fs.existsSync(p));
    console.log('\nVerification results:');
    console.log('Successfully copied to:', successfulCopies.length, 'locations');
    successfulCopies.forEach(p => console.log('- ' + p));

  } catch (error) {
    console.error('Error in copyPrismaEngine:', error);
    process.exit(1);
  }
}

copyPrismaEngine(); 