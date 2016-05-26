var User = require('../models/user');
var controller = {};

controller.index = function(req, res){
  User.find({}, function(err, users){
    if(err) throw err;
      res.json(users);
  });
};

controller.create = function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(function(err){
    if(err) throw err
    res.json({success: true, message: 'user Created'})
  });
};

module.exports = controller;
