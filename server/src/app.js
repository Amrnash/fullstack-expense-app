const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("../routes/user");
const expenseRoutes = require("../routes/expense");
const app = express();
// ----------- DB Config ----------- //
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to the db");
});
mongoose.connection.on("error", () => {
  console.error("Failed to connect to db");
});
// ----------- Middlewares ----------- //
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
require("../config/passport")(passport);
// ----------- Routes ----------- //
app.use(userRoutes);
app.use(expenseRoutes);
// ----------- Handling Errors ----------- //
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Error processing your request";
  res.status(status).send({ error: message });
});
module.exports = app;
