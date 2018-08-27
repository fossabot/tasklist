/**
 * @file lib/functions/run.js
 */
'use strict';

const done    = require('./done');
const reducer = require('./reducer');

/**
 * @param  {TasklistWrapper} wrapper
 * @param  {AsyncFunction}   next
 * @return {Promise.<Object>}
 * @private
 */
module.exports = function run(wrapper, next) {
  return wrapper.tasklist
    .reduce(reducer.bind(null, wrapper, next), Promise.resolve(wrapper.context))
    .then(done.bind(null, wrapper));
};
