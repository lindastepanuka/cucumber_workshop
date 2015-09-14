'use strict';

var driver = require('./world.js').getDriver();

var myHooks = function () {
  this.registerHandler('AfterFeatures', function (event, callback) {
    driver.quit();
    callback();
  });
};

module.exports = myHooks;
