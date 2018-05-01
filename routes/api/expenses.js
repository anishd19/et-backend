var router = require('express').Router();
var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var auth = require('../auth');

var initialExpense = {
  "username": "",
  "categorylist": [],
  "expenses": []
}

router.get('/', auth.required, (req, res) => {
  var limit = 20;
  var offset = 0;
  var username = req.payload.username;

  if (typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  Expense.findOne({username}, {expenses: {$slice: [+offset, +limit]}})
  // .slice('expenses', [offset, limit])
  .exec((err, data) => {
    if (err) {
      console.log(`err: ${err}`);
      res.send(err);
    } else {
      console.log(`username: ${username}, data: ${data}, err: ${err}`);
      res.json(data);
    }
  });
});

router.post('/', auth.required, (req, res) => {
  var username = req.body.username;
  if(username !== req.payload.username) {
    res.send('invalid username');
  }
  var tempExpense = {...initialExpense};
  tempExpense.username = username;
  // tempExpense.expenses = req.payload.expenses;
  // tempExpense.categorylist = tempExpense.expenses.reduce(
  //   (category, expense) => {
  //     return (category.concat(...expense.categorysel));
  //   }
  // )
  Expense.findOne({username})
  .exec((err, data) => {
    Promise.all([
      !data ? 
      Expense.create(tempExpense, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          console.log(`data: ${data}`);
        }
      }) : null
    ]).then((results) => {
      Expense.findOneAndUpdate(
        {username},
        {
          $addToSet: {
            expenses: {$each: req.body.expenses},
            categorylist: {$each: req.body.expenses[0].categorysel}
          }
        }
      ).exec((err, data) => {
        if(err) {
          res.send(err);
        } else {
          console.log(`data: ${data}`);
          res.json(data);
        }
      })
    })
  })
});

router.delete('/', auth.required, (req, res) => {
  var username = req.body.username;
  if(username !== req.payload.username) {
    res.send('invalid username');
  }
  Expense.findOneAndUpdate(
    {username},
    {$pull: {'expenses': {time: req.body.time}}}
  ).exec((err, data) => {
    if(err) {
      res.send(err);
    } else {
      console.log(`data: ${data}`);
      res.json(data);
    }
  })
})

module.exports = router;