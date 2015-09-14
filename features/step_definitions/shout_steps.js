var chai   = require('chai');
var expect = chai.expect;
var Shouty = require('../../lib/shouty');

var Network = Shouty.Network;
var SystemUser = Shouty.SystemUser;

module.exports = function () {

  this.Given(/^Company and Ann are within system$/, function (callback) {
    this.network = new Network();

    this.Company = new SystemUser(this.network);
    this.Ann = new SystemUser(this.network);

    callback();
  });

  this.Given(/^Company is at position (.*) and Ann is in position (.*)$/, function (companyPosition, annPosition, callback) {
    this.Company.position = companyPosition;
    this.Ann.position = annPosition;

    callback();
  });

  this.When(/^Company shouts "([^"]*)"$/, function (shout, callback) {
    this.Company.shout(shout);
    // Write code here that turns the phrase above into concrete actions
    callback();
  });

  this.Then(/^Ann should hear "([^"]*)"$/, function (shout, callback) {
    expect(this.Ann.heardMessages).to.include(shout);

    callback();
  });

  this.Given(/^Company and Ann are not in range of each other$/, function (callback) {
    this.Company.position = 0;
    this.Ann.position = 1001;

    callback();
  });

  this.Then(/^Ann should not hear "([^"]*)"$/, function (shout, callback) {
    expect(this.Ann.heardMessages).to.not.include(shout)

    callback();
  });
};
