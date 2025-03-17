const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  editExpense,
} = require("../Controllers/ExpenseController");

const router = express.Router();

router.post("/add/:userId", addExpense);
router.get("/users/:userId", getExpenses);
router.delete("/users/:userId/expenses/:expenseId", deleteExpense);
router.patch("/expenses/:expenseId", editExpense);

module.exports = router;
