const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/", (req, res, next) => {
  const sql = "select * ofrom questions";
  let params = [];
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
  params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    } else {
      res.json({
        message: "success",
        data: rows
      });
    }
  });
});
router.get("/:id", (req, res, next) => {
  var sql = "select * from topics where question_id = ?";
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
  // if (!req.body.question_id){
  //     errors.push("No question specified");
  // }
  if (!req.body.question_text) {
    errors.push("No question text specified");
  }
  if (!req.body.answer) {
    errors.push("No answer specified");
  }
  if (!req.body.exams_exam_id) {
    errors.push("No exam specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    answer: req.body.answer,
    question_text: req.body.question_text,
    exams_exam_id: req.body.exams_exam_id,
    options: req.body.options
  };
  var sql =
    "INSERT INTO questions ( answer, question_text, options, exams_exam_id, options_2,options_3,options_1) VALUES (?,?,?,?,?,?)";
  var params = [
    data.answer,
    data.question_text,
    data.options_1,
    data.options_2,
    data.options_3,
    data.exams_exam_id
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
    question_text: req.body.question_text,
    exams_exam_id: req.body.exams_exam_id,
    options: req.body.options
  };
  db.run(
    `UPDATE questions set 
        question_text = COALESCE(?,question_text), 
           answer = COALESCE(?,answer) 
           WHERE id = ?`,
    [
      data.answer,
      data.question_text,
      data.options_1,
      data.options_2,
      data.options_3,
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
    "DELETE FROM questions WHERE question_id = ?",
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
