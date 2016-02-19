var chai   = require('chai');
var expect = chai.expect;
var assert = require('assert');
var Shouty = require('../../lib/shouty');

var Network = Shouty.Network;

module.exports = function () {
  this.World = require('./selenium_world').SeleniumWorld;

  var server;

  this.Before(function (callback) {
    var shoutyApp = require('../../lib/shouty_app');
    server = shoutyApp().listen(3030, callback);
  });

  this.After(function (callback) {
    this.closeAll();
    server.close(function () {
      callback();
    });
  });

  this.Given(/^Ann is within the system at position (\d+)$/, function (position, callback) {
    this.getUser("Ann", position, callback);
  });

  this.Given(/^Company is within the system at position (\d+)$/, function (position, callback) {
    this.getUser("Company", position, callback);
  });

  this.When(/^Company shouts "([^"]*)"$/, function (message, callback) {
    this.broadcast(message, 'Company', callback);
  });

  this.Then(/^Ann should hear "([^"]*)"$/, function (expectedMessage, callback) {
    this.messagesHeardBy('Ann', function (err, actualMessagesHeard) {
      assert.deepEqual(actualMessagesHeard, [expectedMessage]);
      callback();
    });

  });

  this.Then(/^Ann should not hear "([^"]*)"$/, function (arg1, callback) {
    this.messagesHeardBy('Ann', function (err, actualMessagesHeard) {
      assert.deepEqual(actualMessagesHeard, []);
      callback();
    });
  });
};
