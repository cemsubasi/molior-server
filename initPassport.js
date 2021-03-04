const Users = require("./models/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { POST_URL } = require("./data");

const BLACK_LIST = []; //POST_URL];

const initPassport = (server) => {
  server.use(passport.initialize());
  server.use(passport.session());
  server.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    else if (!BLACK_LIST.includes(req.url)) return next();
    else return res.status(401).send("UNAUTHORIZED");
  });
  passport.use(
    new LocalStrategy(function (username, password, done) {
      Users.findOne(
        { username: username, password: password },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          return done(null, user);
        }
      );
    })
  );

  passport.deserializeUser(function (user, done) {
    Users.findOne(user, function (err, user) {
      return done(err, user);
    });
  });
  passport.serializeUser((user, done) => {
    return done(null, user);
  });
};

module.exports = initPassport;
