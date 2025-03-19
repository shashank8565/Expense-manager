const User = require("../Models/UserModel");

exports.signUp = async (req, res) => {
  const { userName, password, Email, MonthlyIncome } = req.body;
  const userExists = await User.findOne({ userName });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  await User.create({ userName, password, Email, MonthlyIncome });
  res.status(201).json({ message: "User created successfully" });
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    req.session._id = user._id;

    res.json({ message: "Logged in successfully", _id: user._id });
  }
};
