'use strict';
const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;
module.exports = (req, res) => {
  const serializeData = (data) => new Promise((resolve, reject) => {
    if (data instanceof (AsyncFunction || Promise)) {
      const { asyncFunction } = serializeData;
      asyncFunction(data, req, res)
        .then(resolve)
        .catch(reject);
      return;
    }
    const type = typeof data;
    const serialize = serializeData[type];
    const result = serialize(data, req, res);
    resolve(result);
  });

  const types = {
    object: JSON.stringify,
    string: (s) => s,
    number: toString,
    undefined: () => 'not found',
    function: (fn, req, res) => fn(req, res).toString(),
    asyncFunction: (fn, req, res) => fn(req, res).then(serializeData)
  };

  Object.assign(serializeData, types);
  return serializeData;
};
