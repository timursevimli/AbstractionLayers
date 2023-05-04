'use strict';
const fs = require('fs').promises;

const writeFile = async (fileName, data) => {
  await fs.writeFile(fileName, data, 'utf8');
};

const readFile = async (fileName) => {
  const data = await fs.readFile(fileName, 'utf8');
  return data;
};

module.exports = { writeFile, readFile };
