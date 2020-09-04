const Expense = require("../models/expense");

exports.create = async (req, res, next) => {
  const { amount, description, created } = req.body;
  const expense = new Expense({
    amount,
    description,
    created,
    owner: req.user,
  });
  try {
    const savedExpense = await expense.save();
    return res.send({
      success: true,
      expense: savedExpense,
    });
  } catch (error) {
    next(error);
  }
};
exports.get = async (req, res, body) => {
  const { user } = req;
  const now = new Date();
  const month = parseInt(req.params.month);
  if (month && month >= 0 && month <= 11) now.setMonth(month);
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const query = { owner: user._id, created: { $gte: firstDay, $lt: lastDay } };
  try {
    const expenses = await Expense.find(query);
    return res.send({ expenses });
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  const expenseId = req.params.expenseId;
  console.log(expenseId);
  try {
    const check = await Expense.findOne({ _id: expenseId });
    if (!check.owner.equals(req.user._id)) {
      const err = new Error("unvalid expense");
      err.status = 401;
      throw err;
    }
    await Expense.deleteOne({ _id: expenseId });
    res.send({ message: "successfully deleted" });
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const expenseId = req.params.expenseId;
  const { amount, description, created } = req.body;
  try {
    const check = await Expense.findOne({ _id: expenseId });
    if (!check.owner.equals(req.user._id)) {
      const err = new Error("unvalid expense");
      err.status = 401;
      throw err;
    }
    const expense = await Expense.update(
      { _id: expenseId },
      { amount, description, created }
    );
    return res.send({ success: true, expense });
  } catch (error) {
    next(error);
  }
};
