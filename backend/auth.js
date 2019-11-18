const db = require("./database.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "somestring";

const authenticate = (req, res, next) => {
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  const { email, password } = req.body;
  console.log("body", req.body);
  db.get(query, [email, password], function(err, user) {
    if (err) {
      res.status(500).json({ message: "fail", error: e.message });
    } else if (user) {
      //console.log("user", user);
      req.user = user;
      console.log("user in authenticate", user);
      next();
    } else {
      res
        .status(401)
        .json({ message: "fail", error: "Wrong email or password" });
    }
  });
};

const generateJWT = (req, res, next) => {
  if (req.user) {
    const query = "SELECT * FROM users WHERE  ID=?";
    const jwtPayload = { id: req.user.ID };
    const jwtData = { expiresIn: "2 days" };
    req.token = jwt.sign(jwtPayload, jwtSecret, jwtData);
    console.log("id", req.user.ID, req.token);
    // Sets a new refresh_token every time the jwt is generated
    db.get(query, [req.user.ID], function(err, user) {
      if (err) {
        res.status(500).json({ message: "fail", error: e.message });
      } else {
        if (user) {
          const update_query = "UPDATE users SET token = ? WHERE ID = ?";
          // console.log("weird",update_query);
          db.run(update_query, [req.token, req.user.ID]);
        } else {
          res
            .status(500)
            .json({ message: "fail", error: "Please contact administrator" });
        }
      }
    });
  }
  next();
};

const refreshJWT = (req, res, next) => {
  const query = "SELECT * FROM users WHERE email = ? AND token = ?";
  const { email, token } = req.body;
  db.get(query, [email, token], function(err, user) {
    if (err) {
      res
        .status(401)
        .json({ message: "fail", error: "Invalid user name or token" });
    } else {
      next();
    }
  });
};

const returnJWT = (req, res) => {
  if (req.user && req.token) {
    res.status(201).json({
      message: "success",
      data: {
        token: req.token,
        user: req.user
      }
    });
  } else {
    res.status(401).json({ message: "fail", error: "Unauthorized" });
  }
};

const withAuth = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
  if (!token) {
    res
      .status(401)
      .json({ message: "fail", error: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, jwtSecret, function(err, decoded) {
      if (err) {
        res
          .status(401)
          .json({ message: "fail", error: "Unauthorized: Invalid token" });
      } else {
        const query = "SELECT * FROM users WHERE ID=?";
        db.get(query, [decoded.id], function(err, user) {
          if (err) {
            res
              .status(401)
              .json({ message: "fail", error: "Unauthorized: Invalid token" });
          } else {
            req.user = user;
            next();
          }
        });
      }
    });
  }
};
module.exports = {
  authenticate,
  generateJWT,
  refreshJWT,
  returnJWT,
  withAuth
};
