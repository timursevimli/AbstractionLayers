'use strict';

const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;
const serializeData = (req, res, data) => new Promise((resolve, reject) => {
  const next = (data) => {
    if (data instanceof AsyncFunction) {
      const { asyncFunction } = serializeData;
      return void asyncFunction(data, req, res)
        .then(resolve)
        .catch(reject);
    }
    const type = typeof data;
    const serialize = serializeData[type];
    const result = serialize(data, req, res);
    resolve(result);
  };
  next(data);
});

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: toString,
  undefined: () => 'not found',
  function: (fn, req, res) => fn(req, res).toString(),
  asyncFunction: (fn, req, res) =>
    fn(req, res).then((result) => serializeData(req, res, result))
};

Object.assign(serializeData, types);
module.exports = serializeData;
