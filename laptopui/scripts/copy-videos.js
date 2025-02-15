const fs = require('fs');
const path = require('path');

function copyAssets() {
  const assets = {
    videos: {
      source: path.join(process.cwd(), 'public', 'videos'),
      targets: [
        path.join(process.cwd(), '.next', 'static', 'videos'),
        path.join(process.cwd(), '.next', 'public', 'videos'),
        path.join(process.cwd(), 'public', 'static', 'videos')
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
      console.log(`Creating source ${type} directory...`);
      fs.mkdirSync(source, { recursive: true });
      return;
    }

    targets.forEach(targetDir => {
      try {
        fs.mkdirSync(targetDir, { recursive: true });

        const files = fs.readdirSync(source);
        files.forEach(file => {
          const sourcePath = path.join(source, file);
          const targetPath = path.join(targetDir, file);
          
          if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isFile()) {
            try {
              fs.copyFileSync(sourcePath, targetPath);
              console.log(`Copied ${type}/${file} to ${targetDir}`);
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