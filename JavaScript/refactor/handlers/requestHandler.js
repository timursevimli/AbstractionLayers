'use strict';
const { home, person } = require('../routes');
const {
  logger,
  createSerializeData,
  cache,
  httpError,
} = require('../lib');

const currentUser = { name: 'Plato', age: 2371 };

const httpMethods = {
  'GET': 0,
  'POST': 1
};

const routes = {
  '/': [home, '<h1>You using POST!</h1>'],
  '/user': [person.getPerson, person.postPerson],
  '/user/name': [() => currentUser.name],
  '/user/age': [() => currentUser.age],
  '/not-found': ['<h1>404 Page not found!</h1>'],
};

const requestHandler = async (req, res) => {
  logger(req);
  const hasCache = cache(req);
  if (hasCache) {
    console.log('From cache!');
    res.end(hasCache);
    return;
  }
  const method = httpMethods[req.method];
  const route = routes[req.url] || routes['/not-found'];
  const data = route[method] || route[httpMethods.GET];
  const serializeData = createSerializeData(req, res);
  try {
    const result = await serializeData(data, req, res);
    cache(req, result);
    res.end(result);
  } catch (error) {
    httpError(res, 404, 'Temporarily not working...');
    console.log('Catched Error:', error);
  }
};

module.exports = requestHandler;
