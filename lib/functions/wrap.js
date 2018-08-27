/**
 * @file lib/functions/wrap.js
 */
'use strict';

const EventEmitter = require('events');

/**
 * @param  {Array.<Task>}    tasks
 * @param  {TasklistWrapper} [parent]
 * @return {TasklistWrapper}
 * @private
 */
module.exports = function wrap(tasks, parent) {
  const context = (parent && parent.context) || {};
  const emitter = (parent && parent.emitter) || new EventEmitter();
  const errored = (parent && parent.hasOwnProperty('errored'))
    ? parent.errored
    : false;
  const tasklist = Array.prototype.slice.call(tasks, 0);

  return { context, emitter, errored, parent, tasklist };
};
