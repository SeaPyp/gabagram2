var express       = require('express');
var app           = express();
var mongoose      = require('mongoose');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var OAuth2        = require('oauth').OAuth2;
var passport      = require('passport');
var Strategy      = require('passport-facebook').Strategy;
var api           = express.Router();
var https         = require('https');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var port          = process.env.PORT || 3000;
var db            =  require('./db.js')

var routes = require('./routes/index');
var users = require('./routes/users');
var gabs = require('./routes/gabs');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'unicorns', resave: false, saveUninitialized: false }));

app.use('/', routes);
app.use('/users', users);
app.use('/api/gabs', gabs);
require('./config/passport')(passport)

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/gabs',
    failureRedirect: '/'
  })
);
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/")
})


// var oauth2 = new OAuth2(process.env.FACEBOOK_API_KEY_GAB, process.env.FACEBOOK_API_SECRET_GAB, 'https://api.facebook.com/', null, 'oauth2/token', null);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
