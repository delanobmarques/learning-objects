var createError = require('http-errors'); //create HTTP errors where needed (for express error handling)
var express = require('express');
var path = require('path'); //module that provides a lot of very useful functionality to access and interact with the file system
var cookieParser = require('cookie-parser'); //used to parse the cookie header and populate req.cookies (essentially provides a convenient method for accessing cookie information).
var logger = require('morgan'); 
var mongoose = require('mongoose');//using instance of mongoose to stablish connection with database
var dotenv = require('dotenv'); //using the dotenv package to set environment variables
var cors = require('cors'); //package for providing a Connect/Express middleware that can be used to enable CORS with various options.

//initialize dotenv
dotenv.config();

console.log(process.env.MONGO_CONNECTION_STRING)
//connect to mongodb
mongoose.connect(
      process.env.MONGO_CONNECTION_STRING, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true
      })
      .then(() => console.log('***connected to MongoDB***'))
      .catch(err => console.log(err))

//import our routers
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');//index.js

//initialize express app  
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //jade - server-side template engine

//middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//the first place express looks when loading is the static folders
//if it doesn't find anything goes to the routes
app.use(express.static(path.join(__dirname, './client/build')));
// app.use(validateToken); //can't use it here

//telling the app to start using the routers for specific paths
//.use -> indicates middlewares
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
