var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next){
  res.send('here');
})

router.get('/', function(req, res){
  res.render('index', {user: req.user});
});

router.post('/login', function(req, res, next){
  console.log('post login', req.body);
  // if password and email are correct go to app
  res.redirect('/app.html');
  // else go back to page
});

module.exports = router;

