
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');
var config = require('./config');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser(config.sessionSecret));
  app.use(express.session());
  app.use(express.methodOverride());

  app.locals(require('./helpers'));
  app.use(function(req, res, next) {
    req.session.messages = req.session.messages || [];
    res.locals.site = config.site;
    res.locals.messages = function () {
      var ms = req.session.messages.map(function (m) { return m; });
      req.session.messages = [];
      return ms; 
    };
    next();
  });

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function() {
  app.use(express.errorHandler());
});

//app.error(function(err, req, res, next) {
//  console.log(err);
//  res.render("error", {error: err});
//  next();
//});

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
