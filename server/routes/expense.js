const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const expenseController = require("../controllers/expenseController");

// Customize and protect the routes
router.all("*", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      const error = new Error("you are not authorized!");
      const status = 401;
      throw error;
    }
    req.user = user;
    return next();
  })(req, res, next);
});
// ---------- Potected Routes ---------- //
router.post("/expense", expenseController.create);
router.get("/expense/:month?", expenseController.get);
router.delete("/expense/:expenseId", expenseController.delete);
router.put("/expense/:expenseId", expenseController.update);
router.get("/me", userController.me);
module.exports = router;
