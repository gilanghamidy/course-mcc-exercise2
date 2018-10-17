var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var vappuRouter = require('./routes/vappu');
var calcRouter = require('./routes/calc');
var imageRouter = require('./routes/image');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/vappu', vappuRouter);
app.use('/calc', calcRouter);
app.use('/images', imageRouter);

module.exports = app;
