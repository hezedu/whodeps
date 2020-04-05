#!/usr/bin/env node

const path = require('path');
const pkgName = process.argv[2];
if(!pkgName){
  console.error('need a name.');
  return;
}

const pkgVersion = process.argv[3];
// const cwd = process.cwd();
const cwd = path.join(__dirname, '../linux-remote/client');
let package, pkgLock;
try {
  package = require(path.join(cwd, 'package.json'));
  pkgLock = require(path.join(cwd, 'package-lock.json'));
} catch(e){
  console.error('Error:', 'Unhave package.json or package-lock.json file in "' + cwd + '"');
}

const { main} = require('./index');
const outLog = require('./outlog');
const rootMap = main(package, pkgLock, pkgName, pkgVersion);

outLog(rootMap);
