const mongoose = require("mongoose");
const validator = require("validator");
const expenseSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  created: { type: Date, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
