'use strict';

class Cache {
  constructor() {
    this.cache = new Map();
  }

  #generateKey(req) {
    return `${req.url}|${req.method}|${req.connection.remoteAddress}`;
  }

  getCache(req) {
    const key = this.#generateKey(req);
    return this.cache.get(key);
  }

  setCache(req, value) {
    const key = this.#generateKey(req);
    this.cache.set(key, value);
  }
}

module.exports = new Cache();
