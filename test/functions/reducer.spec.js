/**
 * @file test/functions/reducer.spec.js
 */
'use strict';

const sinon = require('sinon');
const test  = require('ava');

const reducer = require('../../lib/functions/reducer.js');

test('should be a Function', t => {
  t.true(typeof reducer === 'function');
  t.true(reducer.constructor.name === 'Function');
});

test('should wait for the accumulator to resolve', t => {
  const wrapper = {};

  wrapper.context = {
    then: sinon.stub().resolves(wrapper)
  };

  const task = {
    handler: async () => {},
    title:   'test task'
  };

  reducer(wrapper, async () => {}, wrapper.context, task);

  t.true(wrapper.context.then.calledOnce);
});
