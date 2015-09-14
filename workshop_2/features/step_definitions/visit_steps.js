var expect = require('chai').expect;

module.exports = function() {
  this.World = require('../support/world.js').World;

  this.Given(/^I'm on (.*) website$/, function (url, callback) {
    this.driver.get(url).then(function() {
      callback();
    });
  });

  this.When(/^I click link (.*)$/, function (link_name, callback) {
    this.driver.findElement(this.webdriver.By.linkText(link_name)).click().then(
      function() { callback(); }
    );
  });

  this.Then(/^I should see Contact us link$/, function (callback) {
    this.driver.findElement(this.webdriver.By.linkText('Contact us')).then(
      function(elements) {
        expect(elements.length).to.not.equal(0);
        callback();
      }
    )
  });
};
