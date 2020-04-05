function main(pkg, pkgLock, name, version){
  var pkgDeps = pkg.dependencies || Object.create(null);
  var pkgDevDeps = pkg.devDependencies || Object.create(null);
  var optDeps = pkg.optionalDependencies || Object.create(null);
  
  var pkgLockDeps = pkgLock.dependencies || Object.create(null);
  let formatedVersion;
  if(version){
    formatedVersion = formatVersion(version);
  }

  function isCatch(v){
    if(v._htName === name){
      if(formatedVersion){
        return isVersionLessThan(v.version, formatedVersion);
      }
      return true;
    }
  }
  const captured = [];
  function check(key, dep){
    if(dep._isHtCheck){
      return;
    }
    dep._isHtCheck = true;
    dep._htName = key;
    if(isCatch(dep)){
      captured.push(dep);
      return;
      // dep._ht_ischeck = true;
      // let p = dep2._htParent;
      // while(p && p._ht_ischeck){
      //   p._ht_ischeck = true;
      //   p = p._htParent;
      // }
    }
    let requires = dep.requires;
    
  
    if(requires){
      let dep2 = dep.dependencies || Object.create(null);
      Object.keys(requires).forEach(j => {
        let childDep = dep2[j];
        let _p = dep._htParent;
        let _pd = _p ? _p.dependencies : null;
        while(!childDep && _pd){
          childDep = _pd[j];
          _p = _p._htParent;
          _pd = _p ? _p.dependencies : null;
        }
        if(!childDep){
          childDep = pkgLockDeps[j];
        }
        if(childDep){
          childDep._htParent = dep;
          check(j, childDep);
        }
      });
    }
  }
  
  function go(deps){
    for(let i in deps){
      if(pkgLockDeps[i]){
        check(i, pkgLockDeps[i]);
      }
    }
  }
  Object.assign(pkgDeps, pkgDevDeps);
  Object.assign(pkgDeps, optDeps);
  go(pkgDeps);

  //go(pkgDevDeps);
  const rootMap = Object.create(null);
  captured.forEach(v => {
  
    let arr = [];
    let p = v._htParent;
    let depth = 0;
    while(p){
      arr.push({
        name: p._htName,
        version: p.version
      });
      p = p._htParent;
      depth = depth + 1;
    }
    
    arr.reverse();
    arr.push({
      name: v._htName,
      version: v.version
    });
    const rootKey = arr[0].name;
    let v2 = rootMap[rootKey];
    if(!v2){
      v2 = rootMap[rootKey] = {
        name: arr[0].name,
        version: arr[0].version,
        maxDepth: depth,
        list: []
      };
    }
    if(v2.maxDepth < depth){
      v2.maxDepth = depth;
    }
    arr.shift();
    v2.list.push(arr);
  
  });
  return rootMap;
}

function formatVersion(version){
  let arr = version.split('.');
  if(!arr.length || arr.length > 3){
    return 0;
  }
  let n, i , len;
  const result = [];
  for(i = 0, len = arr.length; i < len; i++){
    n = Number(arr[i]);
    if(isNaN(n)){
      return 0;
    }
    result.push(n);
  }
  if(len < 3){
    i = 0;
    len = 3 - len;
    for(; i < len; i++){
      result.push(0);
    }
  }
  return result;
}

function isVersionLessThan(version, fversion){
  let f2 = formatVersion(version);
  if(f2 === 0){
    return true;
  }
  for(let i = 0, len = f2.length; i < len; i++){
    if(f2[i] < fversion[i]){
      return true;
    }
  }
  return false;
}

module.exports = {
  main,
  formatVersion,
  isVersionLessThan
}
