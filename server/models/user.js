const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
    },
  },
  password: { type: String, required: true },
  joined: { type: Date, default: new Date() },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});
userSchema.methods.isPasswordMatched = function (password, hashed, callback) {
  bcrypt.compare(password, hashed, (err, success) => {
    if (err) return callback(err);
    callback(null, success);
  });
};
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};
module.exports = mongoose.model("User", userSchema);
