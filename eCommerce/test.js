const { test, expect } = require('@jest/globals');

test('My first test', () => {
  expect(Math.max(1, 5, 10)).toBe(10);
});
