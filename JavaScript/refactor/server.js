'use strict';
const http = require('node:http');
const config = require('./configs/config');
const { logger } = require('./lib');
const { requestHandler } = require('./handlers');

const createServer = ({ port }) => {
  const server = http.createServer();
  server.on('request', logger);
  server.on('request', requestHandler);
  server.on('listening', () => {
    console.log(`Server is running on port: { ${port} }`);
  });
  server.listen = server.listen.bind(server, port);
  return server;
};

const server = createServer(config);
server.listen();

process.on('uncaughtException', (err, origin) => {
  console.dir({ err, origin });
});
