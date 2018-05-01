var mongoose = require('mongoose');

var ExpenseSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  categorylist: [new mongoose.Schema(
    {
      name: String,
      color: String
    },
    { _id: false })
  ],
  expenses: [new mongoose.Schema(
    {
      time: Number,
      title: String,
      amount: Number,
      categorysel: [new mongoose.Schema(
        {
        name: String,
        color: String
        },
        { _id: false })
      ]
    },
    { _id: false })
  ]
});

mongoose.model('Expense', ExpenseSchema);
