const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const config = {};
  config.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  config.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    new JwtStrategy(config, async (payload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
