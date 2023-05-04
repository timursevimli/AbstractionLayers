'use strict';

const routes = {};
[
  'home',
  'person'
].forEach((name) => routes[name] = require(`./${name}.js`));

module.exports = routes;
