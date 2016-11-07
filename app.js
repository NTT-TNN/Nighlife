
linkToGetJson="";
dt="";
add="";
login=false;
getJson=false;
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// io.sockets.on('connection', function (socket) {
//     socket.on('send', function (doc) {
//       console.log(doc);
//        add=doc;
//        console.log(add);
// // { term: 'food', location: 'Montreal' }
//     //   yelp.search(options)
//     //   .then(function (data) {
//     //       dt=data;
//     //     console.log("get json success");
//     //     console.log(dt.businesses.length);
//     //     io.sockets.emit('locate', dt.businesses);
//     // })
//     //   .catch(function (err) {
//     //  console.error(err);
//     // });

 
//     });
// });


// var Yelp = require('yelp');
// var yelp = new Yelp({
//   consumer_key: 'C7L9OyGBJ8H15J_TqF_Ihw',
//   consumer_secret: 'T8VbkflCPM9Iob0MYZTki7gVGn4',
//   token: 'z4K23QyTEzbc0VodU7qb3qKPw3dTe8Pc',
//   token_secret: 'waUKeikiS97zKSqXzq3qeIrrqIU',
// });

// See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({ term: 'bar', location: add })
// .then(function (data) {
//   dt=data;
//   getJson=true;
//   console.log("get json success");


//   Dt.findOne({'add':add},function(err,result){
//     if(err) throw err;
//     if(result){
//       dt=result;
//       console.log("du lieu da ton tai");
//     }else{
//       var newDt=new Dt();
//       newDt.add=add;
//       for(var i=0;i<dt.businesses.length;++i){
//         var temp={"name":dt.businesses[i].name,
//                   "url":dt.businesses[i].url,
//                   "snippet_text":dt.businesses[i].snippet_text,
//                   "image_url":dt.businesses[i].image_url,
//                   "c":0
//                 };
//         newDt.businesses.push(temp);
//       }

//       newDt.save(function(err){
//         if(err) throw err;
//         console.log("luu du lieu thanh cong");
//       })
//       dt=newDt;
//     }
//   })
// })
// .catch(function (err) {
//   console.error(err);
// });
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var routes = require('./routes/index');
var users = require('./routes/users');

var port = process.env.PORT || 8080;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var Dt = require('./models/dt');

// tim va update database theo dia chi
// var query={},update={},options={};
// while (getJson) {
//
// }




require('./config/passport')(passport);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/users', users);

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
io.sockets.on('connection', function(socket){
  socket.on('find', function(data){
    console.log('city '+data.city);
      Dt.findOne({'add':data.city},function(err,result){
    if(err) throw err;
    var stt=data.myName;
    //console.log(result.businesses[stt]);
      result.businesses[stt].c++;
      result.save(function(err){
        if(err) throw err;
        console.log("luu du lieu thanh cong");
      });
      io.sockets.emit('return', result);
  });
    
  });
});

server.listen(port,function(){
  console.log(port);
});
module.exports = app;
