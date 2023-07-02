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
  const data = await readFile(fileName);
  if (!data) {
    const msg = 'Person is not found!';
    throw new Error(msg);
  }
  const { name, birth } = JSON.parse(data);
  const age = calculateAge(birth);
  return { name, age };
};

const serialize = (obj) => {
  if (Buffer.isBuffer(obj)) {
    obj = obj.toString('utf8');
  }
  const type = typeof obj;
  const serializer = serialize[type];
  return serializer(obj);
};

const serializers = {
  string: (s) => `${s}`,
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

Object.assign(serialize, serializers);

const createBuffer = async (req) => {
  const body = [];
  for await (const chunk of req) {
    body.push(chunk);
  }
  const buffer = Buffer.concat(body);
  return buffer;
};

const postPerson = async (req) => {
  const buffer = await createBuffer(req);
  const person = serialize(buffer);
  await writeFile(fileName, person);
  return person;
};

module.exports = { getPerson, postPerson };
