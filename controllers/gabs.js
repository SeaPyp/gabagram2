var Gab = require('../models/gab');
var controller = {};

controller.index = function(req, res){
  Gab.find({}, function(err, gabs){
    if(err) throw err
    res.json(gabs)
  });
};

controller.create = function(req, res){
  var gab = new Gab();
  // gab.creator = //add user id here ./user_:id
  gab.title = req.body.title;
  gab.gab_body = req.body.gab_body;
  // gab.recipient = //add user id here again (user.findBy.userName)
  gab.isCollected = false;
  gab.createdAt = new Date();
  gab.updatedAt = gab.createdAt;
  gab.save(function(err){
    if(err) throw err
    res.json({success: true, message: 'Gab Created'})
  });
};

controller.update = function(req, res){
  Gab.findById(req.params.id, function(err, gab){
    // gab.creator = //add user id here
    gab.title = req.body.title;
    gab.gab_body = req.body.gab_body;
    // gab.recipient = //add user id here again
    if(req.body.completed){
      gab.isComplete = true;
      gab.completedOn = new Date();
  }
    gab.save(function(err){
      if(err) res.json(err);
      res.json(gab);
    });
  });
};

controller.destroy = function(req, res){
  Gab.findById(req.params.id, function(err, gab){
    if(err) res.json(err);
    gab.remove(function(err){
      if(err) res.json(err);
      res.json({message: 'Deleted'});
    });
  });
};

module.exports = controller;
