const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    MonthlyIncome: {
      type: String,
      required: true,
    },
    AllExpenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expenses" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpenseUser", UserSchema);
