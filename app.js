var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//var indexRouter = require('./routes/index');
var tuotteetRouter = require('./routes/tuotteet');
var toteumatRouter = require('./routes/toteumat');
var tyovuorotRouter = require('./routes/tyovuorot');
var hairiotRouter = require('./routes/hairiot');
var linjatRouter = require('./routes/linjat');
var tot_haiRouter = require('./routes/tot_hai');
var piirakkaRouter = require('./routes/piirakka');
var listaRouter = require('./routes/lista');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/tuotteet', tuotteetRouter);
app.use('/api/toteumat', toteumatRouter);
app.use('/api/tyovuorot', tyovuorotRouter);
app.use('/api/hairiot', hairiotRouter);
app.use('/api/linjat', linjatRouter);
app.use('/api/tot_hai', tot_haiRouter);
app.use('/api/piirakka', piirakkaRouter);
app.use('/api/lista', listaRouter);

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
