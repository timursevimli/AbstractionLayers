'use strict';

const generateKey = ({ url, method, connection }) =>
  `${url}|${method}|${connection.remoteAddress}`;

const createCache = () => {
  const data = new Map();
  return (key, value) => {
    if (key) {
      key = generateKey(key);
      if (value) data.set(key, value);
      else return data.get(key);
    }
  };
};

module.exports = createCache();
