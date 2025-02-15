const fs = require('fs');
const path = require('path');

function cleanBuild() {
  const dirsToClean = [
    path.join(process.cwd(), '.next'),
    path.join(process.cwd(), 'public/static')
  ];

  dirsToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`Cleaned ${dir}`);
      } catch (err) {
        console.warn(`Warning: Could not clean ${dir}:`, err.message);
      }
    }
  });
}

if (require.main === module) {
  cleanBuild();
}

module.exports = cleanBuild; 