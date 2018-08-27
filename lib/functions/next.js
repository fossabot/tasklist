/**
 * @file lib/functions/next.js
 */
'use strict';

const run  = require('./run');
const wrap = require('./wrap');

/**
 * @param  {TasklistWrapper} wrapper
 * @param  {Task}            task
 * @param  {Object}          ctx
 * @return {Promise.<Object>}
 * @private
 */
module.exports = async function next(wrapper, task, ctx) {
  try {
    if (Array.isArray(task)) {
      return await run(wrap(task, wrapper, next), next);
    } else if (wrapper.errored || (task.enabled && !task.enabled())) {
      return ctx;
    }

    await task.handler(task, ctx);
    wrapper.emitter.emit('executed', task);
  } catch (error) {
    wrapper.errored = true;
    wrapper.emitter.emit('error', task, error);

    if (!wrapper.emitter.listenerCount('error')) {
      throw error;
    }
  }

  return ctx;
};
