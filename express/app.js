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

// app.get("/home", function (req, res) {
//   res.render("home")
// })

// app.get("/test", freshHander, function (req, res) {
//   res.send("test" + version)
// })

// app.get("/update", function (req, res) {
//   version = version + 1;
//   res.send()
// })

// app.get("/ajax", function (req, res) {
//   if (req.xhr) {
//     res.send("是ajax请求")
//   } else {
//     res.render("error")
//   }
// })

// app.get("/error", function (req, res) {
//   res.render("error")
// })

// app.get("/", function (req, res) {
//   res.render("index", {
//     list: db.list,
//     title: "title1",
//     logined: req.session.logined
//   })
// })

// app.post("/add", function (req, res) {
//   db.add({
//     title: req.body.title
//   })
//   res.redirect("/")
// })

// app.get("/del", function (req, res) {
//   db.detele(req.query.index)
//   res.redirect("/")
// })

// app.get("/update/:index/:content", function (req, res) {
//   db.update(req.params.index, {
//     title: req.params.content
//   })
//   res.send(req.params.content)
// })

// //name password session 都通过
// app.post("/login", function (req, res) {
//   var name = req.body.name
//   var password = req.body.password
//   var vum = req.body.vum
//   if (name == "name" && password == "password" && vum == req.session.validat_num) {
//     req.session.logined = true
//     res.send("success")
//   } else {
//     res.send("登入失败")
//   }
// })

// app.get("/loginout", function (req, res) {
//   req.session.logined = false
//   res.redirect("/")
// })
// app.get("/back", function (req, res) { //https://segmentfault.com/q/1010000038238254?utm_source=tag-newest 
//   req.session.logined = false //redirect(back)之前/back请求改变了refer指向为/home,so redirect(back)停留本页面
//   //res.redirect("back")
//   res.redirect()
// })




// // refresh png number.
// app.get('/refresh', function (req, res) {
//   function random(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;

//   }
//   var numtxt = req.session.validat_num = random(1000, 9999)
//   if (fs.existsSync(__dirname + "/png/" + numtxt)) {
//     fs.readFile(__dirname + "/png/" + numtxt, function (err, data) {
//       if (err) {

//       } else {
//         res.send(data);
//       }
//     })
//   } else {
//     pw.createPNG(numtxt, function (pngnum) {
//       fs.writeFileSync(__dirname + "/png/" + numtxt, pngnum)
//       res.send(pngnum);
//     })
//   }
// });
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