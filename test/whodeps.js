const path = require('path');
const cliPath = path.join(__dirname, '../cli.js');
const { execSync } = require('child_process');

execSync('node ' + cliPath + ' kind-of 6.0.3', {
  cwd: __dirname,
  stdio: 'inherit'
});

// console.log('-------------------------------------')
// execSync('node ' + cliPath + ' kind-of 6', {
//   cwd: path.join(__dirname, ''),
//   stdio: 'inherit'
// });
