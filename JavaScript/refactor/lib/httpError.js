'use strict';

module.exports = (res, code = 400, message) => {
  res.statusCode = code;
  res.end(`"${message}"`);
};
