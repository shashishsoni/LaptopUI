const fs = require('fs');
const path = require('path');

function copyAssets() {
  const assets = {
    videos: {
      source: path.join(process.cwd(), 'public', 'videos'),
      targets: [
        path.join(process.cwd(), '.next', 'static', 'videos'),
        path.join(process.cwd(), '.next', 'public', 'videos')
      ]
    },
    images: {
      source: path.join(process.cwd(), 'public', 'image'),
      targets: [
        path.join(process.cwd(), '.next', 'static', 'image'),
        path.join(process.cwd(), '.next', 'public', 'image'),
        path.join(process.cwd(), 'public', 'static', 'image')
      ]
    }
  };

  // Ensure .next directory exists
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    fs.mkdirSync(nextDir, { recursive: true });
  }

  Object.entries(assets).forEach(([type, { source, targets }]) => {
    if (!fs.existsSync(source)) {
      console.log(`Source ${type} directory not found: ${source}`);
      return;
    }

    targets.forEach(targetDir => {
      try {
        fs.mkdirSync(targetDir, { recursive: true });
        
        const files = fs.readdirSync(source);
        files.forEach(file => {
          if (file.endsWith('.mp4')) {
            const sourcePath = path.join(source, file);
            const targetPath = path.join(targetDir, file);
            
            try {
              fs.copyFileSync(sourcePath, targetPath);
              console.log(`Copied ${file} to ${targetDir}`);
            } catch (err) {
              console.warn(`Warning: Could not copy ${file}:`, err.message);
            }
          }
        });
      } catch (err) {
        console.warn(`Warning: Error processing ${type} directory:`, err.message);
      }
    });
  });
}

if (require.main === module) {
  copyAssets();
}

module.exports = copyAssets; 