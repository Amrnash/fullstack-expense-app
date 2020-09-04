const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.signupUser = async (req, res, next) => {
  const { name, email, password, joined } = req.body;
  try {
    const user = new User({ name, email, password, joined });
    const createdUser = await user.save();
    const secret = process.env.JWT_SECRET;
    const expire = process.env.JWT_EXP;
    const token = jwt.sign({ _id: createdUser._id }, secret, {
      expiresIn: expire,
    });
    return res.send({ token, createdUser });
  } catch (e) {
    console.log(e);
    if (e.type === "user defined") {
      const error = new Error(
        `${e.errors.email.properties.value} is not a valid email`
      );
      next(error);
    }
    if (e.code === 11000 && e.name === "MongoError") {
      const error = new Error(`Email address ${email} is already taken`);
      next(error);
    } else {
      next(e);
    }
  }
};
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(`The email ${email} does not exist`);
    error.status = 401;
    next(error);
  }
  user.isPasswordMatched(password, user.password, (err, matched) => {
    if (matched) {
      const secret = process.env.JWT_SECRET;
      const expire = process.env.JWT_EXP;
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });
      return res.send({ token });
    }
    res.status(401).send({ error: "invalid email/password combination" });
  });
};
exports.me = (req, res, next) => {
  const { user } = req;
  return res.send({ user });
};
