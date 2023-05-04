'use strict';
const path = require('node:path');
const { readFile, writeFile } = require('../lib/').files;

const msOnYear = 1000 * 60 * 60 * 24 * 365;

const calculateAge = (birth) => {
  const difference = new Date() - new Date(birth);
  const age = Math.floor(difference / msOnYear);
  return age;
};

const fileName = path.join(__dirname, 'person.json');

const getPerson = async () => {
  try {
    const data = await readFile(fileName);
    const { name, birth } = JSON.parse(data);
    const age = calculateAge(birth);
    return { name, age };
  } catch (error) {
    throw error;
  }
};

const chunkData = (req) => new Promise((resolve, reject) => {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => resolve(body));
  req.on('error', reject);
});

const serialize = (obj) => {
  const { serializers } = serialize;
  const type = typeof obj;
  const serializer = serializers[type];
  return serializer(obj);
};

serialize.serializers = {
  string: (s) => `${s.trim()}`,
  number: (n) => n.toString(),
  object: (o) => {
    if (Array.isArray(o)) return `[${o}]`;
    if (o === null) return 'null';
    let s = '{';
    for (const key in o) {
      const value = o[key];
      if (s.length > 1) s += ',';
      s += `"${key}" : "${serialize(value)}"`;
    }
    return s + '}';
  }
};

const postPerson = async (req) => {
  try {
    const chunk = await chunkData(req);
    const data = Buffer.concat(chunk).toString();
    const person = serialize(JSON.parse(data));
    await writeFile(fileName, person);
    return person;
  } catch (error) {
    throw error;
  }
};

module.exports = { getPerson, postPerson };
