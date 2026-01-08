const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const bumpType = process.argv[2] || 'patch'; // default to patch
const filePath = path.join(__dirname, '..', 'version.json');
const versionData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let [major, minor, patch] = versionData.version.split('.').map(Number);

switch (bumpType) {
  case 'major':
    major += 1;
    minor = 0;
    patch = 0;
    break;
  case 'minor':
    minor += 1;
    patch = 0;
    break;
  case 'patch':
  default:
    patch += 1;
}

const newVersion = `${major}.${minor}.${patch}`;
versionData.version = newVersion;
versionData.androidVersionCode += 1;
versionData.iosBuildNumber += 1;

fs.writeFileSync(filePath, JSON.stringify(versionData, null, 2));

console.log(`📦 Bumped to version: ${newVersion}`);

// Auto Commit and Push
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${newVersion}"`, {
    stdio: 'inherit',
  });
  execSync('git push', { stdio: 'inherit' });
  console.log(`📦 Commited and pushed the code`);
} catch (err) {
  console.error('⚠️  Failed to commit version bump:', err.message);
}
