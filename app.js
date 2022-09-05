var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require('./routes/api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 测试jwt的功能和用法
// require('./utils/jwt_example')

// Datbase connection here
const { MongoDBURL } = require('./setting')
mongoose.connect(MongoDBURL);


// CORS config here , 在这里设置允许跨域访问
app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 以下代码的作用：根据url区分权限，区分需要身份验证、和不要身份验证的网页，还未实验，参考网址：https://juejin.cn/post/6847902223242887181
// const { createToken, verifyToken } = require('../utils/jwt')
// const whiteList = [
//   '/laf/login',
//   '/laf/found',
//   '/laf/lost'
// ]
// app.use((req,res,next)=>{
//   if(!whiteList.includes(req.url)){
//     verifyToken(req.headers.authorization).then(res=>{
//       next()
//     }).catch(err=>{
//       res.status(401).send('请重新登陆！invalid token')
//     })
//   }
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/laf', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
