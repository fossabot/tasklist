/**
 * @file test/functions/next.spec.js
 */
'use strict';

const sinon = require('sinon');
const test  = require('ava');

const next = require('../../lib/functions/next.js');

test('should be an AsyncFunction', t => {
  t.true(typeof next === 'function');
  t.true(next.constructor.name === 'AsyncFunction');
});

test('should emit `error` events on error if listeners available', async t => {
  const wrapper = {
    errored: false,
    emitter: {
      emit: sinon.stub(),
      listenerCount: sinon.stub().returns(1)
    }
  };

  const error = new Error('test error');

  const task = {
    handler: async() => {
      throw error;
    },
    title: 'error'
  };

  const context = {};

  await t.notThrowsAsync(async () => {
    await next(wrapper, task, context);
  });

  t.true(wrapper.emitter.emit.calledOnce);
});

test('should throw errors if no listeners available', async t => {
  const wrapper = {
    errored: false,
    emitter: {
      emit: sinon.stub(),
      listenerCount: sinon.stub().returns(0)
    }
  };

  const error = new Error('test error');

  const task = {
    handler: async() => {
      throw error;
    },
    title: 'error'
  };

  const context = {};

  await t.throwsAsync(async () => {
    await next(wrapper, task, context);
  }, {
    instanceOf: Error,
    message: 'test error'
  });
});

test('should emit `executed` event after task is executed', async t => {
  const wrapper = {
    errored: false,
    emitter: {
      emit: sinon.stub(),
      listenerCount: sinon.stub().returns(1)
    }
  };

  const task = {
    handler: async() => {},
    title:   'noop'
  };

  const context = {};

  await t.notThrowsAsync(async () => {
    await next(wrapper, task, context);
  });

  t.true(wrapper.emitter.emit.calledOnceWithExactly('executed', task));
});

test('should skip task if `errored` is true', async t => {
  const wrapper = {
    errored: true,
    emitter: {
      emit: sinon.stub(),
      listenerCount: sinon.stub().returns(1)
    }
  };

  const task = {
    handler: sinon.stub().resolves(),
    title:   'noop'
  };

  const context = {};

  await t.notThrowsAsync(async () => {
    await next(wrapper, task, context);
  });

  t.true(task.handler.notCalled);
});

test('should skip task if `task#enabled` returns false', async t => {
  const wrapper = {
    errored: false,
    emitter: {
      emit: sinon.stub(),
      listenerCount: sinon.stub().returns(1)
    }
  };

  const task = {
    enabled: () => false,
    handler: sinon.stub().resolves(),
    title:   'noop'
  };

  const context = {};

  await t.notThrowsAsync(async () => {
    await next(wrapper, task, context);
  });

  t.true(task.handler.notCalled);
});

test('should process Arrays of tasks', async t => {
  const wrapper = {
    errored: false,
    emitter: {
      emit: sinon.stub(),
      listenerCount: sinon.stub().returns(1)
    }
  };

  const task = [
    {
      handler: sinon.stub().resolves(),
      title:   'noop'
    }, {
      handler: sinon.stub().resolves(),
      title:   'noop'
    }
  ];

  const context = {};

  await t.notThrowsAsync(async () => {
    await next(wrapper, task, context);
  });

  t.true(task[0].handler.calledOnce);
  t.true(task[1].handler.calledOnce);
});
