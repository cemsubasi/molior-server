const express = require("express");
const passport = require("passport");
const router = express.Router();
const { SUPER_URL } = require("../data");

router.post(SUPER_URL, (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) next(err);
    if (!user) return res.status(404).send("user not found");
    req.logIn(user, (err) => {
      if (err) next(err);
      return res.status(200).send("true");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("logout success");
});

module.exports = router;
