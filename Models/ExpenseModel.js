const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    ExpenseType: {
      type: String,
      required: true,
    },
    ExpenseCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", ExpenseSchema);
