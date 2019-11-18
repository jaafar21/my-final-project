const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../database.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now());
  }
});
const upload = multer({ storage: storage });

router.get("/", (req, res, next) => {
  var sql = "select * from chapters";
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
  var sql = "select * from chapters where chapter_id = ?";
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
router.post("/", upload.single("image"), (req, res, next) => {
  var errors = [];
  if (!req.body.chapter_title) {
    errors.push("No chapter_title specified");
  }
  if (!req.body.status) {
    errors.push("No status specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    status: req.body.status,
    chapter_title: req.body.chapter_title,
    chapter_image: req.body.filename
  };
  var sql =
    "INSERT INTO chapters (chapter_title,status,chapter_image) VALUES (?,?,?)";
  var params = [data.status, data.chapter_image, data.chapter_title];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      chapter_id: this.lastID
    });
  });
});
router.patch("/:id", (req, res, next) => {
  // console.log("heyy");
  var data = {
    chapter_title: req.body.chapter_title,
    status: req.body.status,
    chapter_image: req.body.chapter_image
  };
  console.log("daata", data);
  db.run(
    `UPDATE chapters set 
           status = COALESCE(?,status), 
          chapter_title = COALESCE(?,chapter_title),
          chapter_image = COALESCE(?,chapter_image)
           WHERE chapter_id = ?`,
    [data.status, data.chapter_title, data.chapter_image, req.params.id],
    function(err, result) {
      console.log("err", err);
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      // console.log("nsnsns");
      res.json({
        message: "success",
        data: data,
        changes: this.changes
      });
    }
  );
});
router.delete("/:id", (req, res, next) => {
  db.run("DELETE FROM chapters WHERE chapter_id = ?", [req.params.id], function(
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

router.get("/:chapter_id/exams", (req, res) => {
  const sql = `select * FROM exams  join questions where exams.exam_id = questions.exams_exam_id and exams.chapters_chapter_id = ${req.params.chapter_id}`;
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.log("err", err);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    });
  });
});

router.get("/:chapter_id/topics", (req, res, next) => {
  const sql = "select * from topics where chapters_chapter_id = ?";
  const params = [req.params.chapter_id];
  db.all(sql, params, (err, row) => {
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
router.post("/:chapter_id/topics", (req, res, next) => {
  const errors = [];
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
      chapters_chapter_id: this.lastID
    });
  });
});

module.exports = router;
