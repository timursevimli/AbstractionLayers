'use strict';
module.exports = (res, code, message) => {
  // console.dir({ req, res });
  res.statusCode = code;
  res.end(`"${message}"`);
};
