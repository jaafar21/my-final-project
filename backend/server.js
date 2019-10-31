// Create express app
var express = require("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Server port
var HTTP_PORT = 8001;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "hellllllllllllllllloooooo" });
});
// *******users table*****//
app.get("/api/users", (req, res, next) => {
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
app.get("/api/users/:id", (req, res, next) => {
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
app.post("/api/users/", (req, res, next) => {
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
app.patch("/api/users/:id", (req, res, next) => {
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
app.delete("/api/users/:id", (req, res, next) => {
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

// ******topics table******//
app.get("/api/topics", (req, res, next) => {
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
app.get("/api/topics/:id", (req, res, next) => {
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
app.get("/api/chapters/:chapter_id/topics", (req, res, next) => {
  var sql = "select * from topics where chapters_chapter_id = ?";
  var params = [req.params.chapter_id];
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
app.post("/api/chapters/:chapter_id/topics", (req, res, next) => {
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
      chapters_chapter_id: this.lastID
    });
  });
});
app.post("/api/topics/", (req, res, next) => {
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
app.patch("/api/topics/:id", (req, res, next) => {
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
app.delete("/api/topics/:id", async (req, res, next) => {
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
// ******chapters table******//
app.get("/api/chapters", (req, res, next) => {
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
app.get("/api/chapters/:id", (req, res, next) => {
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
app.post("/api/chapters", (req, res, next) => {
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
    chapter_title: req.body.chapter_title
  };
  var sql = "INSERT INTO chapters (chapter_title,status) VALUES (?, ?)";
  var params = [data.status, data.chapter_title];
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
app.patch("/api/chapters/:id", (req, res, next) => {
  // console.log("heyy");
  var data = {
    chapter_title: req.body.chapter_title,
    status: req.body.status
  };
  console.log("daata", data);
  db.run(
    `UPDATE chapters set 
           status = COALESCE(?,status), 
          chapter_title = COALESCE(?,chapter_title) 
           WHERE chapter_id = ?`,
    [data.status, data.chapter_title, req.params.id],
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
app.delete("/api/chapters/:id", (req, res, next) => {
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
///// *******           questions TABLE******///
app.get("/api/questions", (req, res, next) => {
  var sql = "select * from questions";
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
app.get("/api/questions/:id", (req, res, next) => {
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
app.post("/api/questions/", (req, res, next) => {
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
    exams_exam_id: req.body.exams_exam_id
  };
  var sql =
    "INSERT INTO questions ( answer, question_text,exams_exam_id) VALUES (?,?,?)";
  var params = [data.answer, data.question_text, data.exams_exam_id];
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
app.patch("/api/questions/:id", (req, res, next) => {
  var data = {
    question_text: req.body.question_text,
    answer: req.body.answer,
    exams_exam_id: req.body.exams_exam_id
  };
  db.run(
    `UPDATE questions set 
        question_text = COALESCE(?,question_text), 
           answer = COALESCE(?,answer) 
           WHERE id = ?`,
    [data.answer, data.question_text, req.params.id],
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
app.delete("/api/questions/:id", async (req, res, next) => {
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
//************************exams table***************** */

app.get("/api/exams", (req, res, next) => {
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
app.get("/api/exams/:id", (req, res, next) => {
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
app.post("/api/exams", (req, res, next) => {
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
app.patch("/api/exams/:id", (req, res, next) => {
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
app.delete("/api/exams/:id", async (req, res, next) => {
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
//************************USERS_QUESTION  TABLE*/
app.get("/api/users_questions", (req, res, next) => {
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
app.get("/api/users_questions/:id", (req, res, next) => {
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
app.post("/api/users_questions/", (req, res, next) => {
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
app.patch("/api/users_questions/:id", (req, res, next) => {
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
app.delete("/api/users_questions/:id", async (req, res, next) => {
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
///***********exams results******* */
app.get("/api/exams_results", (req, res, next) => {
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
app.get("/api/exams_results/:id", (req, res, next) => {
  var sql = "select * from exams_results where result_id = ?";
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
app.post("/api/exams_results/", (req, res, next) => {
  var errors = [];
  if (!req.body.date) {
    errors.push("No date specified");
  }
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
    date: req.body.date,
    score: req.body.score,
    users_ID: req.body.users_ID,
    exam_exam_id: req.body.exam_exam_id
  };
  var sql =
    "INSERT INTO exams_results (date, score, users_ID,exam_exam_id) VALUES (?,?,?,?)";
  var params = [data.date, data.users_ID, data.score, data.exam_exam_id];
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
app.patch("/api/exams_results/:id", (req, res, next) => {
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
app.delete("/api/exams_results/:id", async (req, res, next) => {
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
// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res) {
  res.status(404);
});
