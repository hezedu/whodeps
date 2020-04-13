#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const pkgName = process.argv[2];
if(!pkgName){
  console.error('need a name.');
  return;
}

const pkgVersion = process.argv[3];
const cwd = process.cwd();
const pkgPath = path.join(cwd, 'package.json');
const pkgLockPath = path.join(cwd, 'package-lock.json');

try {
  fs.accessSync(pkgPath);
} catch(e){
  console.error(` unhave "package.json" file in "${cwd}"`);
  return;
}

try {
  fs.statSync(pkgLockPath);
} catch(e){
  console.error(` unhave "package-lock.json" file in "${cwd}"`);
  return;
}

const package = require(pkgPath);
const pkgLock = require(pkgLockPath);

const {main} = require('./index');
const outLog = require('./lib/outlog');
const rootMap = main(package, pkgLock, pkgName, pkgVersion);

outLog(pkgName, rootMap);
