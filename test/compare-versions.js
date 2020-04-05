const {formatVersion, isVersionLessThan} = require('../index');

const version = formatVersion('6.0');

console.log('version', version);

let isless = isVersionLessThan('6', version);
console.log('isless', isless)