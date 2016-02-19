var webdriver = require('selenium-webdriver');
var By = webdriver.By;

module.exports.SeleniumWorld = function (callback) {
  var browsers = {};

  this.closeAll = function() {
    for(var personName in browsers) {
      var browser = browsers[personName];
      browser.close();
    }
  };

  this.getUser = function(personName, position, callback) {
    var browser = new webdriver.Builder()
      .forBrowser('firefox')
      .build();

    browsers[personName] = browser;

    browser.get(
      'http://localhost:3030/people/' + personName + '?position=' + position
    ).then(callback);
  };

  this.broadcast = function(message, personName, callback) {
    var browser = browsers[personName];
    console.log(personName);

    browser.findElement(By.name('message')).sendKeys(message);
    browser.findElement(By.name('shout')).click().then(function () {
      callback();
    });
  };

  this.messagesHeardBy = function (personName, callback) {
    var browser = browsers[personName];

    // refresh page to get new messages (if any)
    browser.navigate().refresh().then(function () {
      var selector = By.xpath('//li');

      browser.findElements(selector).then(function (lis) {
        var messagePromises = lis.map(function (li) {
          return li.getText();
        });
        webdriver.promise.all(messagePromises).then(function (messages) {
          return callback(null, messages);
        });
      });
    });
  };

  callback();
};
