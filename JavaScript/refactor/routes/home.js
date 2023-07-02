'use strict';

const { headersParser } = require('../lib/');

module.exports = (req) => {
  const headers = headersParser(req);
  const ip = req.connection.remoteAddress;
  return `
    <h1>Welcome</h1>Your IP: ${ip}<br><pre>${JSON.stringify(headers)}</pre>
    `;
};
