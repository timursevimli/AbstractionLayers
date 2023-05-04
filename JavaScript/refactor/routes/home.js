'use strict';

const { cookieParser } = require('../lib/');
module.exports = (req) => {
  const cookies = cookieParser(req);
  const ip = req.connection.remoteAddress;
  return `
    <h1>Welcome</h1>Your IP: ${ip}<br><pre>${JSON.stringify(cookies)}</pre>
    `;
};
