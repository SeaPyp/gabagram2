var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next){
  res.render('login', {user: req.user});
})

router.post('/login', function(req, res, next){
  console.log('post login', req.body);
  // if password and email are correct go to app
  res.redirect('/gabs');
  // else go back to page
});

router.get('/', function(req, res){
  res.render('index', {user: req.user});
});

router.get('/signup', function(req, res, next){
  console.log(req);
  res.render('signup');
})

router.get('/map', function(req, res){
  res.render('map');
})
module.exports = router;

