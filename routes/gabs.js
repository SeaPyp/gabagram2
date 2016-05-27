var express = require('express');
var router = express.Router();
var controller = require('../controllers/gabs');

/* GET gabs listing. */
router.route('/')
  .get(controller.index)
  .post(controller.create)

// router.route('/:id')
//   .patch(controller.update)
//   .delete(controller.destroy);

module.exports = router;
