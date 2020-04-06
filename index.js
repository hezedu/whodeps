const genList = require('./lib/gen-list');

function main(pkg, pkgLock, name, version){
  var pkgDeps = pkg.dependencies;
  if(!pkgDeps){
    return;
  }
  var pkgLockDeps = pkgLock.dependencies;
  if(!pkgLockDeps){
    return;
  }
  var pkgDevDeps = pkg.devDependencies || Object.create(null);
  var optDeps = pkg.optionalDependencies || Object.create(null);
  Object.assign(pkgDeps, pkgDevDeps);
  Object.assign(pkgDeps, optDeps);
  
  

  let formatedVersion;
  if(version){
    formatedVersion = formatVersion(version);
  }
  const captured = [];
  function _isCatch(v){
    if(v.name === name){
      if(formatedVersion){
        return isVersionLessThan(v.version, formatedVersion);
      }
      return true;
    }
  }
  const tree = {
    IS_ROOT: true,
    child: {}
  };
  function genTree(_requires, _tree, depArr){
    Object.keys(_requires).forEach(k => {

      let item = _tree.child[k] = {
        parent: _tree,
        name: k,
        child: Object.create(null)
      }
      let v = _findDep(k, depArr);
      let depsArr2 = [v.dependencies].concat(depArr);

      item.version = v.version;


      if(v._treeItem){
          // Object.assign(item, v._treeItem);
          // item.child = v._treeItem.child;
          if(!v._treeItem.parents){
            v._treeItem.parents = [];
          }
          if(v._treeItem !== tree && v._treeItem.parents.indexOf(_tree) === -1){
            v._treeItem.parents.push(_tree);
          }
          
      } else {
        v._treeItem = item;
        if(v.requires){
          genTree(v.requires, item, depsArr2);
        }
      }
      if(_isCatch(item)){
        captured.push(item);
      }
    })
  }

  function _findDep(key, arr){
    for(let i =0, len = arr.length; i < len; i++){
      if(arr[i] && arr[i][key]){
        return arr[i][key];
      }
    }
  }
  genTree(pkgDeps, tree, [pkgLockDeps]);
  return genList(captured);

}




module.exports = main;



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