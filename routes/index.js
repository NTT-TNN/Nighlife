var express = require('express');
var passport=require('passport');
var router = express.Router();

var Dt = require('../models/dt');
var Yelp = require('yelp');
var yelp = new Yelp({
  consumer_key: 'C7L9OyGBJ8H15J_TqF_Ihw',
  consumer_secret: 'T8VbkflCPM9Iob0MYZTki7gVGn4',
  token: 'z4K23QyTEzbc0VodU7qb3qKPw3dTe8Pc',
  token_secret: 'waUKeikiS97zKSqXzq3qeIrrqIU',
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{message:req.flash('loginMessage')});
});
router.get('/search/:name',function(req,res){
	yelp.search({ term: 'bar', location: req.params.name })
	.then(function (data) {
  	dt=data;
  	getJson=true;
  	console.log("get json success");
  	console.log('dt');
  	console.log(dt.businesses[0].name);


  Dt.findOne({'add':req.params.name},function(err,result){
    if(err) throw err;
    if(result){
      dt=result;
      console.log("du lieu da ton tai");
    }else{
      var newDt=new Dt();
      newDt.add=req.params.name;
      for(var i=0;i<dt.businesses.length;++i){
        var temp={"name":dt.businesses[i].name,
                  "url":dt.businesses[i].url,
                  "snippet_text":dt.businesses[i].snippet_text,
                  "image_url":dt.businesses[i].image_url,
                  "c":0
                };
        newDt.businesses.push(temp);
      }

      newDt.save(function(err){
        if(err) throw err;
        console.log("luu du lieu thanh cong");
      })
      dt=newDt;
    }
  })
  
})
	.catch(function (err) {
  		console.error(err);
	});
	res.json(dt);
});
 module.exports = router;
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    login=true;
    return next();
  }

  res.redirect('/');
}
