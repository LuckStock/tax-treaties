// npm packages
const test = require('tape');

// tests
const core = require('./core');

// execute tests
core(test);

// finish tests
test((t) => {
  t.end();
  process.exit();
});
