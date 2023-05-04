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

const createBuffer = async (req) => {
  const body = [];
  for await (const chunk of req) {
    body.push(chunk);
  }
  const buffer = Buffer.from(body).toString();
  return buffer;
};

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
    const buffer = await createBuffer(req);
    const person = serialize(JSON.parse(buffer));
    await writeFile(fileName, person);
    return person;
  } catch (error) {
    throw error;
  }
};

module.exports = { getPerson, postPerson };
