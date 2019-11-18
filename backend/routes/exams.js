const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/", (req, res, next) => {
  var sql = "select * from exams";
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
  var sql = "select * from exams where exam_id = ?";
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
  if (!req.body.exam_title) {
    errors.push("No exam title specified");
  }

  if (!req.body.chapters_chapter_id) {
    errors.push("No chapters specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    exam_title: req.body.exam_title,
    chapters_chapter_id: req.body.chapters_chapter_id
  };
  var sql = "INSERT INTO exams ( exam_title,chapters_chapter_id) VALUES (?,?)";
  var params = [data.exam_title, data.chapters_chapter_id];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      exam_id: this.lastID
    });
  });
});
router.patch("/:id", (req, res, next) => {
  var data = {
    exam_title: req.body.exam_title,
    chapters_chapter_id: req.body.chapters_chapter_id
  };
  db.run(
    `UPDATE exams set 
        exam_title = COALESCE(?,exam_title) 
           WHERE id = ?`,
    [data.exam_title, req.params.id],
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
router.delete("/:id", async (req, res, next) => {
  console.log(req.params);
  await db.run(
    "DELETE FROM exams WHERE exam_id = ?",
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
