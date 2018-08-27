/**
 * @file lib/index.js
 */
'use strict';

const next = require('./functions/next');
const run  = require('./functions/run');
const wrap = require('./functions/wrap');

/**
 * @typedef TasklistWrapper
 * @type {Object}
 * @property {Object}          context
 * @property {EventEmitter}    emitter
 * @property {Boolean}         errored
 * @property {TasklistWrapper} parent
 * @property {Array.<Task>}    tasklist
 */

/**
 * @typedef Task
 * @type {Object}
 * @property {Function}      enabled
 * @property {AsyncFunction} handler
 * @property {String}        title
 */

/**
 * @param  {Array.<Task>}    tasks
 * @return {TasklistWrapper}
 * @public
 */
module.exports = function taskList(tasks) {
  const wrapper = wrap(tasks);

  wrapper.run = run.bind(null, wrapper, next);

  return wrapper;
};
