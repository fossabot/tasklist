/**
 * @file lib/functions/next.js
 */
'use strict';

const run  = require('./run');
const wrap = require('./wrap');

/**
 * @param  {TasklistWrapper}  wrapper
 * @param  {Task}             task
 * @param  {Object}           ctx
 * @param  {AsyncFunction}    next
 * @return {Promise.<Object>}
 * @private
 */
async function executeTask(wrapper, task, ctx, next) {
  if (Array.isArray(task)) {
    return run(wrap(task, wrapper, next), next);
  } else if (wrapper.errored || (task.enabled && !task.enabled())) {
    return ctx;
  }

  await task.handler(task, ctx);
  wrapper.emitter.emit('executed', task);

  return ctx;
};

/**
 * @param  {TasklistWrapper} wrapper
 * @param  {Task}            task
 * @param  {Object}          ctx
 * @param  {Error}           error
 * @return {Object}
 * @private
 */
function handleError(wrapper, task, ctx, error) {
  wrapper.errored = true;
  wrapper.emitter.emit('error', task, error);

  if (!wrapper.emitter.listenerCount('error')) {
    throw error;
  }

  return ctx;
};

/**
 * @param  {TasklistWrapper} wrapper
 * @param  {Task}            task
 * @param  {Object}          ctx
 * @return {Promise.<Object>}
 * @private
 */
module.exports = async function next(wrapper, task, ctx) {
  try {
    return await executeTask(wrapper, task, ctx, next);
  } catch (error) {
    return handleError(wrapper, task, ctx, error);
  }
};
