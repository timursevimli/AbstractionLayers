'use strict';

const fs = require('fs').promises;

const exists = async (path) => {
  try {
    const exist =  await fs.access(path).then(() => true, () => false);
    return exist;
  } catch (err) {
    throw err;
  }
};

const writeFile = async (path, data) => {
  const isExist = await exists(path);
  if (isExist) await fs.writeFile(path, data, 'utf8');
};

const readFile = async (path) => {
  const isExist = await exists(path);
  if (isExist) return await fs.readFile(path, 'utf8');
};

module.exports = { writeFile, readFile };
