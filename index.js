const express = require("express");
const connectDB = require("./Config/Db");
const AuthRoute = require("./Routes/AuthRoute");
const ExpenseRoute = require("./Routes/ExpenseRoute");
var cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = 3000;

app.use(express.json());
const session = require("express-session");
app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend's URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false, // Avoid storing unnecessary sessions
    cookie: {
      httpOnly: true,
      secure: false, // Must be false in development (true in production)
      sameSite: "lax", // More secure and prevents CSRF issues
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use("/auth", AuthRoute);
app.use("/api", ExpenseRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
