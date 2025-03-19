const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  editExpense,
} = require("../Controllers/ExpenseController");
const isAuth = require("../Middlewares/isAuth");

const router = express.Router();

router.post("/add/:userId", isAuth, addExpense);
router.get("/users/:userId", isAuth, getExpenses);
router.delete("/users/:userId/expenses/:expenseId", isAuth, deleteExpense);
router.patch("/expenses/:expenseId", isAuth, editExpense);

module.exports = router;
