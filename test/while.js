let i = 4;
while(true){
  console.log(i)
  if(i === 0){
    break;
  }
  i--;
}
console.log('end ', i)


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