'use strict';
module.exports = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  return '<h1>404 Page Not Found!</h1>';
};
