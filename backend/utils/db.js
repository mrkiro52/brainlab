const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

const read = (filename) => {
  const filepath = path.join(DATA_DIR, `${filename}.json`);
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const write = (filename, data) => {
  const filepath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

const getById = (filename, id) => {
  const data = read(filename);
  return data.find(item => item.id === id);
};

const create = (filename, item) => {
  const data = read(filename);
  const newItem = {
    ...item,
    id: Date.now().toString()
  };
  data.push(newItem);
  write(filename, data);
  return newItem;
};

const update = (filename, id, updates) => {
  const data = read(filename);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates };
  write(filename, data);
  return data[index];
};

const remove = (filename, id) => {
  const data = read(filename);
  const filtered = data.filter(item => item.id !== id);
  write(filename, filtered);
  return true;
};

module.exports = { read, write, getById, create, update, remove };
