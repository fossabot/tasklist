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
  return Object.assign({
    context: {},
    emitter: new EventEmitter(),
    errored: false
  }, parent, {
    tasklist: Array.prototype.slice.call(tasks, 0),
    parent
  });
};
