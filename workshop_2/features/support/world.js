var webdriver = require('selenium-webdriver');

var buildFirefoxDriver = function() {
  return new webdriver.Builder().
    forBrowser('firefox').
    build();
};

var getDriver = function() {
  return driver;
};

var driver = buildFirefoxDriver();

var World = function World(callback) {
  this.webdriver = webdriver;

  this.driver = driver;

  callback();
};

module.exports.World = World;
module.exports.getDriver = getDriver;
