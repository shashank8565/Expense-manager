const express = require("express");
const connectDB = require("./Config/Db");
const AuthRoute = require("./Routes/AuthRoute");
const ExpenseRoute = require("./Routes/ExpenseRoute");
const app = express();
require("dotenv").config();

const PORT = 3000;

app.use(express.json());
app.use("/auth", AuthRoute);
app.use("/api", ExpenseRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
