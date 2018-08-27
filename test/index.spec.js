/**
 * @file test/index.spec.js
 */
'use strict';

const test = require('ava');

const tasklist = require('../lib/index.js');

test('should return an object', t => {
  const wrapper = tasklist([]);

  t.true(typeof wrapper === 'object');
});
