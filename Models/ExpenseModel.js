const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    ExpenseType: {
      type: String,
      required: true,
      enum: ["Rent", "Food", "Groceries"],
    },
    ExpenseCost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", ExpenseSchema);
