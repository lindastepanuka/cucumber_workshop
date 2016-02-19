var express = require('express');
var bodyParser = require('body-parser');
var Shouty = require('./shouty');

var Network = Shouty.Network;
var SystemUser = Shouty.SystemUser;

module.exports = function() {
  var network = new Network();

  var app = express();
  app.set('view engine', 'jade');
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/people/:personName', function (req, res) {
    var personName = req.params.personName;
    var position = req.query.position;
    var person  = network.getUser(personName, position);
    var messages = network.messagesHeardBy(personName);

    res.render('index', {
      personName: personName,
      messages: messages
    });
  });

  app.post('/messages', function (req, res) {
    network.broadcast(req.body.message, network.getUser(req.body.personName));
    res.redirect(req.get('Referer'));
  });

  return app;
};
