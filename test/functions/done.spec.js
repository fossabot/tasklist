/**
 * @file test/functions/done.spec.js
 */
'use strict';

const sinon = require('sinon');
const test  = require('ava');

const done = require('../../lib/functions/done.js');

test('should be a Function', t => {
  t.true(typeof done === 'function');
  t.true(done.constructor.name === 'Function');
});

test('should emit `complete` event if wrapper has no parent', t => {
  const wrapper = {
    emitter: {
      emit: sinon.stub().returnsArg(1)
    }
  };

  const context = {};

  done(wrapper, context);

  t.true(wrapper.emitter.emit.calledOnceWithExactly('complete', context));
});

test('should return context if wrapper has a parent', t => {
  const wrapper = {
    emitter: {
      emit: sinon.stub().returnsArg(1)
    },
    parent: {}
  };

  const context = {};

  t.true(done(wrapper, context) === context);
  t.true(wrapper.emitter.emit.notCalled);
});
