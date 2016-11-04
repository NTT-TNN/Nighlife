var express = require('express');
var passport=require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{message:req.flash('loginMessage')});
});

// router.get('/home',function(req,res){
//   res.render('home',{title:'Home'});
// })



// router.get('/login',function(req,res,next){
//   res.render('login.ejs',{message:req.flash('loginMessage')});
// });
//
// router.get('/signup',function(req,res){
//   res.render('signup.ejs',{message:req.flash('loginMessage')});
// });
//
// router.get('/profile',isLoggedIn,function(req,res){
//   res.render('profile.ejs',{user:req.user});
// });
//
// router.get('/logout',function(req,res){
//   req.logout();
//   res.redirect('/');
// })
//
// router.post('/signup',passport.authenticate('local-signup',{
//   successRedirect:'/profile',
//   failureRedirect:'/signup',
//   failureFlash:true,
// }));
//
// router.post('/login',passport.authenticate('local-login',{
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: true,
// }))
//
// router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
//
// router.get('/auth/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: '/profile',
//   failureRedirect: '/',
// }));
//
// router.get('/auth/twitter', passport.authenticate('twitter'));
//
// router.get('/auth/twitter/callback', passport.authenticate('twitter', {
//   successRedirect: '/profile',
//   failureRedirect: '/',
// }));
//
//
 module.exports = router;
//
// function isLoggedIn(req,res,next){
//   if(req.isAuthenticated())
//     return next();
//   res.redirect('/');
//
// }
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    login=true;
    return next();
  }

  res.redirect('/');
}
