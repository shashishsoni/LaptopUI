const fs = require('fs');
const path = require('path');
const copyVideos = require('./copy-videos');

function cleanNextFolder() {
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('Cleaning .next directory...');
    try {
      // Try to remove only specific subdirectories that we need to update
      const safeDirsToClean = ['static', 'public'];
      safeDirsToClean.forEach(dir => {
        const dirPath = path.join(nextDir, dir);
        if (fs.existsSync(dirPath)) {
          fs.rmSync(dirPath, { recursive: true, force: true });
        }
      });
    } catch (err) {
      console.warn('Warning: Could not fully clean .next directory:', err.message);
      // Continue execution even if cleaning fails
    }
  }
}

function ensureDirectories() {
  const dirs = [
    path.join(process.cwd(), '.next', 'static', 'videos'),
    path.join(process.cwd(), '.next', 'public', 'videos'),
    path.join(process.cwd(), 'public', 'static', 'videos')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

function postInstall() {
  try {
    // Clean specific folders in .next
    cleanNextFolder();
    
    // Ensure directories exist
    ensureDirectories();
    
    // Copy videos to new locations
    copyVideos();
    
    console.log('Post-install process completed successfully');
  } catch (error) {
    console.error('Error in post-install process:', error);
    // Don't exit with error to allow installation to continue
    process.exit(0);
  }
}

postInstall(); 