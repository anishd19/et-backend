var mongoose = require('mongoose');

var ExpenseSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  categorylist: [{
    name: String,
    color: String
  }],
  expenses: [{
    time: {type: Date, default: Date.now},
    title: String,
    amount: Number,
    categorysel: [{
      name: String,
      color: String
    }]
  }]
});

mongoose.model('Expense', ExpenseSchema);
