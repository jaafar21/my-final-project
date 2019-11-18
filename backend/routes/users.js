const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/", (req, res, next) => {
  var sql = "select * from users";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    });
  });
});
router.get("/:id", (req, res, next) => {
  var sql = "select * from users where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row
    });
  });
});
router.post("/", (req, res, next) => {
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
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      ID: this.lastID
    });
  });
});
router.patch("/:id", (req, res, next) => {
  var data = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };
  db.run(
    `UPDATE users set 
           user_name = COALESCE(?,user_name), 
           email = COALESCE(?,email), 
           password = COALESCE(?,password) 
           role = COALESCE(?,role)
           WHERE id = ?`,
    [data.user_name, data.email, data.password, data.role, req.params.id],
    function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes
      });
    }
  );
});
router.delete("/:id", (req, res, next) => {
  db.run("DELETE FROM users WHERE id = ?", req.params.id, function(
    err,
    result
  ) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

router.get("/:ID/exams/:exam_id/exams_results", (req, res, next) => {
  var sql =
    "select * from exams_results where users_ID = ? AND exam_exam_id = ?";
  var params = [req.params.ID, req.params.exam_id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ message: "fail", error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row
    });
  });
});

module.exports = router;
