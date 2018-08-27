/**
 * @file test/functions/wrap.spec.js
 */
'use strict';

const test = require('ava');

const wrap = require('../../lib/functions/wrap.js');

test('should be a Function', t => {
  t.true(typeof wrap === 'function');
  t.true(wrap.constructor.name === 'Function');
});

test('should return object with `context`, `emitter`, `errored`, `parent`, and `tasklist` properties', t => {
  const wrapper = wrap([]);

  [ 'context', 'emitter', 'errored', 'parent', 'tasklist' ].forEach((property) => {
    t.true(Object.prototype.hasOwnProperty.call(wrapper, property));
  });
});

test('should use parent\'s properties if parent is provided', t => {
  const parent = {
    context:  {},
    emitter:  {},
    errored:  false
  };
  const wrapper = wrap([], parent);

  t.true(parent.context === wrapper.context);
});
