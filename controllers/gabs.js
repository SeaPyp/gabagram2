var Gab = require('../models/gab');
var gabs = {};

gabs.index = function(req, res) {
  Gab.find({}, function(err, gabs) {
    if (err) {
      throw err;
    }
    res.render('gabs/index', {gabs: gabs});
  });
};

gabs.new = function(req, res) {
  res.render('gabs/new', { title: 'Gabs' });
    var db = req.db;
    var title = req.body.username;
    var body = req.body.category;
    var collection = db.get('question');
    collection.insert({
      "title" : title,
      "category" : category,
      "content" : content
    }, function (err, doc) {
      if (err) {
        res.send("There was a problem adding the information to the database.");
      }
      else {
        res.redirect('/questions');
      }
  });
};

questions.create = function(req, res) {
  var question = new Question();
  console.log(req.user);
  question.title = req.body.title;
  question.category = req.body.category;
  question.body = req.body.body;
  question.user = req.user.githubUsername;
  console.log(req.body);

  question.save(function(err, question){
    if(err){
      console.log(err);
    }
    res.redirect('/questions');
  });
};


questions.show = function(req, res) {
  Question.findById(req.params.id, function(err, question){
    if (err) {
      throw err;
    }
    res.render('questions/show', {question: question});
  });
};

questions.edit = function(req, res) {
  Question.findById(req.params.id, function(err, question) {
    if (err) {
      throw err;
    }
    res.render('questions/edit', {question: question});
  });
};

questions.update = function(req, res) {
  var title = req.body.title;
  var category = req.body.category;
  var content = req.body.body;

  console.log('body is: ' + req.body.body);

 //find the document by ID
  Question.findById(req.params.id, function (err, question) {
    //update it
    console.log('Updating question: ' + question);
    question.update({
      title : title,
      category : category,
      body : content,
    }, function (err, questions) {
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      }
      else {
        res.redirect('/questions/' + question.id);
      }
    });
  });
};

questions.destroy = function(req, res) {
Question.findById(req.params.id, function (err, question) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            question.remove(function (err, question) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETED');
                    res.json({message: 'deleted!'})
                }
            });
        }
    });
};
module.exports = questions;

controller.index = function(req, res){
  Gab.find({}, function(err, gabs){
    if(err) throw err
    res.render('gabs')
  });
};

controller.create = function(req, res){
  res.render('gabs/new', {title: 'Gabs'});
  var db = req.db;
  // var creator = //user id goes here
  var title = req.body.title
  var body = req.body.gab_body;
  // var recipient = //add user id here again (user.findBy.userName)
  var isCollected = false;
  var createdAt = new Date();
  var updatedAt = gab.createdAt;
  var collection =db.get('gab');
  collection.insert({
    "title" : title,
    "gab_body" : body,
  }, function (err, doc) {
    if(err) {
      res.send("There was a problem with your gab send");
    }
    else {
      res.redirect('/gabs');
    }
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
