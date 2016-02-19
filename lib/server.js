var shoutyApp = require('./shouty_app');
var port = 3030;

var server = shoutyApp().listen(port, function (err) {
  if(err) throw(err);
  console.log('Shouty listening at http://localhost:%s', port);
});
