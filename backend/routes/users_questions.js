const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/", (req, res, next) => {
  var sql = "select * from users_questions";
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
  var sql = "select * from users_qustions where user_question_id = ?";
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
  if (!req.body.status) {
    errors.push("No status specified");
  }
  if (!req.body.answer) {
    errors.push("No answer specified");
  }
  if (!req.body.user_ID) {
    errors.push("No user specified");
  }
  if (!req.body.questions_question_id) {
    errors.push("No qustions specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    status: req.body.status,
    answer: req.body.answer,
    user_ID: req.body.user_ID,
    questions_question_id: req.body.questions_question_id
  };
  var sql =
    "INSERT INTO users_questions (answer, status, user_ID,questions_question_id) VALUES (?,?,?,?)";
  var params = [
    data.answer,
    data.user_ID,
    data.status,
    data.questions_question_id
  ];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      question_id: this.lastID
    });
  });
});
router.patch("/:id", (req, res, next) => {
  var data = {
    answer: req.body.answer,
    status: req.body.status,
    user_ID: req.body.user_ID,
    questions_question_id: req.body.questions_question_id
  };
  db.run(
    `UPDATE users_questions set 
           answer = COALESCE(?,answer), 
           status = COALESCE(?,status), 
           user_ID = COALESCE(?,user_ID),
           questions_question_id = COALESCE(?,questions_question_id)
           WHERE user_question_id = ?`,
    [
      data.answer,
      data.user_ID,
      data.status,
      data.questions_question_id,
      req.params.id
    ],
    function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
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
router.delete("/:id", async (req, res, next) => {
  console.log(req.params);
  await db.run(
    "DELETE FROM users_questions WHERE user_question_id= ?",
    [req.params.id],

    function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json({ message: "deleted", changes: this.changes });
    }
  );
});
module.exports = router;
