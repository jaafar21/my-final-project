const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/", (req, res, next) => {
  var sql = "select * from exams_results";
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
  var sql = "select * from exams_results where result_id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ exams_results, message: "success", data: row });
  });
});

router.post("/", (req, res, next) => {
  var errors = [];
  if (!req.body.score) {
    errors.push("No score specified");
  }
  if (!req.body.users_ID) {
    errors.push("No user specified");
  }
  if (!req.body.exam_exam_id) {
    errors.push("No exam specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    score: req.body.score,
    users_ID: req.body.users_ID,
    exam_exam_id: req.body.exam_exam_id
  };

  var sql =
    "INSERT INTO exams_results (date, score, users_ID,exam_exam_id) VALUES ( DATE('now'), ?, ?, ?)";
  var params = [data.score, data.users_ID, data.exam_exam_id];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      result_id: this.lastID
    });
  });
});
router.patch("/:id", (req, res, next) => {
  var data = {
    date: req.body.date,
    score: req.body.score,
    users_ID: req.body.users_ID,
    exam_exam_id: req.body.exam_exam_id
  };
  db.run(
    `UPDATE exams_results set 
           date = COALESCE(?,date), 
           score = COALESCE(?,score), 
           users_ID = COALESCE(?,users_ID),
           exam_exam_id= COALESCE(?,exam_exam_id)
           WHERE result_id = ?`,
    [data.date, data.users_ID, data.score, data.exam_exam_id, req.params.id],
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
    "DELETE FROM exams_results WHERE result_id= ?",
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
