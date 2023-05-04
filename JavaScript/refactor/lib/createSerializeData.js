'use strict';
const AsyncFunction = Object.getPrototypeOf(async () => { }).constructor;
module.exports = (req, res) => {
  const serializeData = async (data) => {
    let type = typeof data;
    if (type === 'function') {
      type = data instanceof AsyncFunction ?
        'asyncFunction' :
        'function';
    }
    const serialize = serializeData[type];
    const result = await serialize(data, req, res);
    return result;
  };

  const types = {
    object: JSON.stringify,
    string: (s) => s,
    number: toString,
    undefined: () => 'not found',
    function: (fn, req, res) => fn(req, res).toString(),
    asyncFunction: async (fn, req, res) => serializeData(await fn(req, res))
  };

  Object.assign(serializeData, types);
  return serializeData;
};
