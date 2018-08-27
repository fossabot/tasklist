/**
 * @file lib/functions/done.js
 */
'use strict';

/**
 * @param  {TasklistWrapper} wrapper
 * @param  {Object}          ctx
 * @return {Object}
 * @private
 */
module.exports = function done(wrapper, ctx) {
  if (!wrapper.parent) {
    wrapper.emitter.emit('complete', ctx);
  }

  return ctx;
};
