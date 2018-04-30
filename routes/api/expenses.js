var router = require('express').Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var auth = require('../auth');

router.get('/', auth.required, function(req, res) {
  var limit = 20;
  var offset = 0;
  var username = req.payload.username;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  Expense.findOne({username}, {expenses: {$slice: [+offset, +limit]}})
  // .slice('expenses', [offset, limit])
  .exec((err, data) => {
    if(err) {
      console.log(`err: ${err}`);
      res.send(err);
    } else {
      console.log(`username: ${username}, data: ${data}, err: ${err}`);
      res.json(data);
    }
  });
});

module.exports = router;