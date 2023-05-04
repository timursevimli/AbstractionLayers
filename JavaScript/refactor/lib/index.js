'use strict';
const lib = {};
[
  'cache',
  'cookieParser',
  'httpError',
  'logger',
  'createSerializeData',
  'files',
].forEach((name) => lib[name] = require(`./${name}.js`));
module.exports = lib;
