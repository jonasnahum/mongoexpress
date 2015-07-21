var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require ("passport");
var passportLocal = require ("passport-local");
var dbConnection = require('./database/dbConnection')();
dbConnection.connect('mongodb://localhost/alumnos');

var auth = require('./routes/auth');
var users = require('./routes/users');
var students = require('./routes/students');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user,done){// the user ID is serialized to the session, keeping the amount of data stored within the session small. 
    done(null, user.id);
});
passport.deserializeUser(function(id,done){//When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.
//query database or cacke here
    done(null, {id: id, name:id});
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', auth);
app.use('/users', users);
app.use('/api/students', students);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});      


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
