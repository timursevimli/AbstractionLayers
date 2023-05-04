'use strict';

module.exports = (req) => {
  const date = new Date().toISOString();
  setTimeout(() => {
    console.log([date, req.method, req.url].join('  '));
  }, 0);
};
