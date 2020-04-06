function genList(captured){
  const result = [];
  captured.forEach(v => {
    const map = Object.create(null);
    loopToTop(v, map);
    result.push(map);
  });
  return result;
}

function loopToTop(item, _map){
  
  
  if(!item.name){
    return;
  }
  // console.log('item.name', item.name)
  const item2 = _map[item.name] = {
    name: item.name,
    version: item.version,
    parents: null
  }
  let parents = item.parents || [];
  if(item.parent){
    if(parents.indexOf(item.parent) === -1){
      parents.push(item.parent);
    }
  }
  if(parents.length){
    let _map2 = Object.create(null);
    
    parents.forEach(p => {
      loopToTop(p, _map2);
    })
    if(Object.keys(_map2).length){
      item2.parents = _map2;
    }
  }
}


module.exports = genList;


