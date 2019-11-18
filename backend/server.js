// Create express app
const multer = require("multer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const auth = require("./routes/auth");
const users = require("./routes/users");
const exams_results = require("./routes/exams_results");
const users_questions = require("./routes/users_questions");
const exams = require("./routes/exams");
const chapters = require("./routes/chapters");
const topics = require("./routes/topics");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./public/images"));
// Server port
const HTTP_PORT = 8001;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/exams_results", exams_results);
app.use("/api/users_questions", users_questions);
app.use("/api/exams", exams);
app.use("/api/chapters", chapters);
app.use("/api/topics", topics);

// Default response for any other request
app.use(function(req, res) {
  res.status(404);
});
