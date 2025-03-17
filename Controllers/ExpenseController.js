const Expense = require("../Models/ExpenseModel");
const User = require("../Models/UserModel");

exports.addExpense = async (req, res) => {
  const { userId } = req.params;

  const { ExpenseType, ExpenseCost } = req.body;

  // Validate input
  if (!ExpenseType || !ExpenseCost) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newExpense = new Expense({
    ExpenseType,
    ExpenseCost,
  });

  const savedExpense = await newExpense.save();

  user.AllExpenses.push({ _id: savedExpense._id });
  await user.save();

  res
    .status(201)
    .json({ message: "Expense added successfully", expense: savedExpense });
};

exports.getExpenses = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("AllExpenses")
      .select("AllExpenses");
    // Populate expenses
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { userId, expenseId } = req.params;

  const deletedExpense = await Expense.findByIdAndDelete(expenseId);
  if (!deletedExpense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  await User.findByIdAndUpdate(userId, {
    $pull: { AllExpenses: expenseId },
  });

  res
    .status(200)
    .json({ message: "Expense deleted successfully from user and database" });
};

exports.editExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      req.body, // Data to update
      { new: true, runValidators: true } // Return updated document & validate
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
