'use strict';
const { home, person, notFound } = require('../routes');
const { logger, serializeData, cache, httpError, } = require('../lib');

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
  '/not-found': [notFound],
};

const cloneObj = (obj) => Object.assign(Object.create(null), obj);

const requestHandler = async (req, res) => {
  const { method, url, connection: { remoteAddress } } = req;
  const reqInfo = cloneObj({ method, url, remoteAddress });
  logger(reqInfo);
  const hasCache = cache(reqInfo);
  if (hasCache) {
    res.end(hasCache);
    return;
  }
  const METHOD = httpMethods[method];
  const route = routes[url] || routes['/not-found'];
  const data = route[METHOD] || route[httpMethods['GET']];
  try {
    const result = await serializeData(req, res, data);
    cache(req, result);
    res.end(result);
  } catch (error) {
    httpError(res, 404, 'Temporarily not working...');
    console.log('Catched Error:', error);
  }
};

module.exports = requestHandler;
