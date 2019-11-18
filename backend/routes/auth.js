const express = require("express");
const router = express.Router();
const db = require("../database.js");

const authMidlleware = require("../auth");
const authenticate = authMidlleware.authenticate;
const generateJWT = authMidlleware.generateJWT;
const returnJWT = authMidlleware.returnJWT;
const refreshJWT = authMidlleware.refreshJWT;
const withAuth = authMidlleware.withAuth;

/*LOGIN/TOKEN*/
router.post("/login", authenticate, generateJWT, returnJWT);

router.post("/check_token", withAuth, (req, res) => {
  res.json({
    message: "success",
    data: {
      user: req.user
    }
  });
});

/*SIGN UP USER*/
router.post("/signup", (req, res) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (!req.body.role) {
    errors.push("No role specified");
  }
  if (!req.body.user_name) {
    errors.push("No user_name specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };
  var sql =
    "INSERT INTO users (user_name, email, password , role) VALUES (?,?,?,?)";
  var params = [data.user_name, data.email, data.password, data.role];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ message: "fail", error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      ID: this.lastID
    });
  });
});

module.exports = router;
