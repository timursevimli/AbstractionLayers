'use strict';

module.exports = ({ method, url }) => {
  const date = new Date().toISOString();
  setTimeout(() => {
    console.log([date, method, url].join('  '));
  }, 0);
};
