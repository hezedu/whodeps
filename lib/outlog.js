
function outLog(rootMap){
  for(let rootDepName in rootMap){
    let v = rootMap[rootDepName];
    let title = _simpleColor('cyan', `${v.name}@${v.version}`);
    console.log(`${title} (${v.list.length}) max depths: ${v.maxDepth}`);
    for(let i in v.list){
      let subList = v.list[i];
      let str = '  >';
      let names = [];
      let litem = subList.pop();

      subList.forEach(v => {
        names.push(v.name);
      })
      names.push(_simpleColor('red', `${litem.name}@${litem.version}`));
      console.log('  > ' + names.join(' > '))
    }
    console.log('');
  }
}

const _COLOR_MAP = {
  red: 31, 
  // green: 32,
  // yellow: 33, 
  cyan: 96,
  // gray: 
};
function _simpleColor(style, str) {
  return '\u001b[' + _COLOR_MAP[style] + 'm' + str + '\u001b[39m';
}

module.exports = outLog;
