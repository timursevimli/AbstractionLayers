'use strict';
const lib = {};
[
  'requestHandler',
].forEach((name) => lib[name] = require(`./${name}.js`));
module.exports = lib;
