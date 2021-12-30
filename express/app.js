var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require("fs")
var session = require("express-session");
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.post("/rtm",function(req,res){
  console.info(req.body.value)
  fs.readFile('./data.json', 'utf-8', function(err, data) {
    if (err) {
        throw err;
    }
    let newData
    if(!data){
       newData=[{value:req.body.value}]
    }else{
      newData=JSON.parse(data)
      newData.push({
        value:req.body.value
      })
    }
    fs.writeFile('./data.json',JSON.stringify(newData), function(err) {
      if (err) {
          throw err;
      }
    });
    res.send("OK")
  });
})

app.get("/appenpraises",function(req,res){//返回当前全部消息
  fs.readFile('./data.json', 'utf-8', function(err, data) {
    if (err) {
        throw err;
    }
    res.send(JSON.parse(data))
  });
})
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