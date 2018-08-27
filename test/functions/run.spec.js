/**
 * @file test/functions/run.spec.js
 */
'use strict';

const sinon = require('sinon');
const test  = require('ava');

const run = require('../../lib/functions/run.js');

test('should be a Function', t => {
  t.true(typeof run === 'function');
  t.true(run.constructor.name === 'Function');
});

test('should return a Promise', async t => {
  const wrapper = {
    context:  {},
    emitter:  {
      emit: sinon.stub()
    },
    tasklist: []
  };

  const result = run(wrapper, async () => {});

  t.pass(result instanceof Promise);
});

test('Promise should resolve to the tasklist context', async t => {
  const wrapper = {
    context:  {},
    emitter:  {
      emit: sinon.stub()
    },
    tasklist: []
  };

  const result = await run(wrapper, async () => {});

  t.pass(result === wrapper.context);
});
