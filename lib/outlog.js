const fs = require('fs');
function _wrapName(v){
  return v.name + '@' + v.version;
}
function outLog(name, list){
  // fs.writeFileSync('./out.json', JSON.stringify(list, null, ' '))
  let list2 = [];
  list.forEach((item, i) => {
    let v = item[name];
    let tbody = [];
    list2.push(tbody);
    let depth = 0, index = 0;

    function genArr(v2){
      if(index !== 0 && !tbody[index - 1]){
        index = index - 1;
      }
      if(!tbody[index]){
        tbody[index] = [];
      }
      tbody[index][depth] = _wrapName(v2);

      let p = v2.parents;
      if(p){
        // let _depath = depth;
       
        
        depth = depth + 1;
        let key3 = Object.keys(p);
        key3.forEach((k3, i3) => {
          let v3 = p[k3];
          
          // if(_depath === depth){
          //   index = index + 1;
          // }
          
          if(i3 > 0){
            index = index + 1;
          }
          genArr(v3);
          if(i3 > 0){
            index = index - 1;
          }
          // if(_depath === depth){
          //   index = index - 1;
          // }
        });
        depth = depth - 1;
      } else {
        index = index + 1;
        // if(tbody[index]){
        //   index = index + 1;
        // }
      }
    }
    genArr(v);

  });


  let outputArr = [];
  let preLine;
  
  list2.forEach(_tbody => {
    _tbody.forEach(line => {

      let lineItem;
  
      for(let i = 0, len = line.length; i < len; i++){
        lineItem = line[i];
        if(!lineItem){
          if(preLine && preLine[i]){
            line[i] = preLine[i];
          }
        }
      }
      let outLine = [].concat(line);
      outLine.reverse()
      outputArr.push(outLine);
      preLine = line;
    })
  })
  // list2[0].forEach(line => {


  // })
  const rootMap = Object.create(null);
  outputArr.forEach(line => {
    let rootItem = line.shift();
    if(!rootMap[rootItem]){
      rootMap[rootItem] = [];
    }
    rootMap[rootItem].push(line);
  })
  let total = 0, maxDepth = 0;
  for(let i in rootMap){
    total = total + rootMap[i].length;
    console.log(_simpleColor('cyan', `${i} (${rootMap[i].length})`));
    rootMap[i].forEach(line => {
      if(line.length > maxDepth){
        maxDepth = line.length;
      }
      let cItem = line.pop();
      cItem = _simpleColor('red', ' > ' + cItem);
      let pre = '', mid = '';
      if(line.length){
        pre = _simpleColor('cyan', '  > ');
        mid = line.join(' > ')
      }

      console.log(pre + mid + cItem);
    });
  }
  let totalStr = `Total(${_simpleColor('red', total)})`;
  let rootKeys = Object.keys(rootMap);
  console.log(`\n${totalStr} depends Root deps(${rootKeys.length}): ${_simpleColor('cyan', rootKeys.join(', '))} Max depth: ${maxDepth}`)
}

const _COLOR_MAP = {
  red: 31, 
  // green: 32,
  // yellow: 33, 
  cyan: 96,
  // gray: 90
};
function _simpleColor(style, str) {
  return '\u001b[' + _COLOR_MAP[style] + 'm' + str + '\u001b[39m';
}

module.exports = outLog;
