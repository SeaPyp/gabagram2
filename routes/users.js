var express = require('express');
var router = express.Router();
var controller = require('../controllers/users');
var model = require('../models/user');

/* GET users listing. */
router.route('/')
  .get(controller.index)
  .post(controller.create)


module.exports = router;
