const { intervals } = require('../config.json');
const fs = require('fs');

const bypassed = (...history) => {
  const now = Date.now();
  const [a, b, c] = [
    history[history.length - 1] || 0,
    history[history.length - 2] || 0,
    history[history.length - 3] || 0
  ];

  return a <= intervals[0] || ((b - c) + (a - b) + (now - a)) >= intervals[1];
}

const replace = (string) => {
  if (typeof string !== 'string') return null;

  return string.split(/(?=[A-Z])/).map(word => word.toUpperCase()).join('_');
}

const getFiles = (dir) => {
  return fs.readdirSync(dir).map(file => file.slice(0, file.length - 3));
}

module.exports = { bypassed, replace, getFiles };