var pkg = require('./package.json');
var pkgLock = require('./package-lock.json');
var name = 'hoek';


var pkgDeps = pkg.dependencies;
var pkgDevDeps = pkg.devDependencies;
var pkgLockDeps = pkgLock.dependencies;

function check(dep){
  if(dep.checked){
    return dep.checkedResult;
  }
  dep.checked = true;
  if(dep.name === name){
    dep.checkedResult = true
    return true;
  }else{
    var requires = dep.requires;
    for(let j in requires){
      
      if(pkgLockDeps[j]){
        pkgLockDeps[j].name = j;
        if(check(pkgLockDeps[j])){
          dep.checkedResult = true
          return true;
        };
      }
      // else{
      //   if(dep.dependencies && dep.dependencies[j]){
      //     dep.dependencies[j].name = j;
      //     if(check(dep.dependencies[j])){
      //       dep.checkedResult = true
      //       return true;
      //     };
      //   }else{
      //     console.log('j', j)
      //   }
      // }
    }
  }
  dep.checkedResult = false
  return false;
}
const hinted = [];

function go(deps){
  for(let i in deps){
    const v = pkgLockDeps[i];
    v.name = i;
    if(check(v)){
      hinted.push(i);
    }
  }
}
Object.assign(pkgDeps, pkgDevDeps)
go(pkgDeps);
//go(pkgDevDeps);
console.log('hinted', hinted)
