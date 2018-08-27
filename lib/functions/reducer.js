/**
 * @file lib/functions/reducer.js
 */
'use strict';

/**
 * @param  {TasklistWrapper} wrapper
 * @param  {AsyncFunction}   next
 * @param  {Object}          ctx
 * @param  {Task}            task
 * @return {Promise.<Object>}
 * @private
 */
module.exports = function reducer(wrapper, next, ctx, task) {
  return ctx.then(next.bind(null, wrapper, task));
};
