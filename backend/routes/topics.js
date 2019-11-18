const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.get("/", (req, res, next) => {
  var sql = "select * from topics";
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
  var sql = "select * from topics where topic_id = ?";
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
  if (!req.body.title) {
    errors.push("No title specified");
  }
  if (!req.body.discription) {
    errors.push("No discription specified");
  }
  if (!req.body.image) {
    errors.push("No image specified");
  }
  if (!req.body.chapters_chapter_id) {
    errors.push("No chapter_id specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    title: req.body.title,
    discription: req.body.discription,
    image: req.body.image,
    chapters_chapter_id: req.body.chapters_chapter_id
  };
  var sql =
    "INSERT INTO topics (title, discription, image,chapters_chapter_id) VALUES (?,?,?,?)";
  var params = [
    data.title,
    data.discription,
    data.image,
    data.chapters_chapter_id
  ];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      topic_id: this.lastID
    });
  });
});
router.patch("/:id", (req, res, next) => {
  var data = {
    title: req.body.title,
    discription: req.body.discription,
    image: req.body.image,
    chapters_chapter_id: req.body.chapters_chapter_id
  };
  db.run(
    `UPDATE topics set 
           title = COALESCE(?,title), 
           discription = COALESCE(?,discription), 
           image = COALESCE(?,image) 
           WHERE id = ?`,
    [data.title, data.discription, data.image, req.params.id],
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
    "DELETE FROM topics WHERE topic_id = ?",
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
