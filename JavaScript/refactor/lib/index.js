'use strict';
const lib = {};
[
  'cache',
  'headersParser',
  'httpError',
  'logger',
  'createSerializeData',
  'files',
].forEach((name) => lib[name] = require(`./${name}.js`));
module.exports = lib;
