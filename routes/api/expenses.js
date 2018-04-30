var router = require('express').Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var auth = require('../auth');

router.get('/', auth.required, function(req, res) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  res.json(req.user.admin);
});

module.exports = router;