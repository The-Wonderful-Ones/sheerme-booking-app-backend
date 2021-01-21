//  Add in the authentication within this file
const express = require("express");
const router = express.Router();
const connection = require("../config");
const bcrypt = require("bcrypt");

// jwt strategy modules
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// Passport modules for local strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, cb) => {
      return cb(null, jwtPayload);
    }
  )
);

passport.use(
  "local",
  new LocalStrategy(
    {
      // The email and password is received from the login route
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (email, password, callback) => {
      connection.query(
        `SELECT * FROM staff WHERE email_address = ?`,
        email,
        (err, foundUser) => {
          // If generic error return the callback with the error message
          if (err) return callback(err);

          // If there is no user found send back incorrect email
          if (!foundUser || !foundUser.length)
            return callback(null, false, { message: "Incorrect email." });

          // If there is a user with that email but password is incorrect
          if (!bcrypt.compareSync(password, foundUser[0].password))
            return callback(null, false, {
              message: "Incorrect password.",
            });

          // If password and email is correct send user information to callback
          return callback(null, foundUser[0]);
        }
      );
    }
  )
);

/*----------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/auth
---------------------------------------------------------- */

// POST sign in form (/api/auth/signin)
router.post("/signin", function (req, res) {
  passport.authenticate(
    "local",
    // Passport callback function below
    (err, user, info) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(400).json({ message: info.message });
      const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
      let { password, ...foundUser } = user;
      return res.json({ foundUser, token });
    }
  )(req, res);
});

// POST sign in form (/api/auth/signin/resetpass)
router.post("/signin/resetpass", (req, res, next) => {});

// POST sign up form (/api/auth/signup)
router.post("/signup", (req, res) => {
  const { company_name, app_base_color, logo_img_path } = req.body;
  connection.query(
    "INSERT INTO company (name, app_base_color, logo_img_path) VALUES (?, ?, ?)",
    [company_name, app_base_color, logo_img_path],
    (error, results) => {
      if (error) res.status(500).send(error);

      const password = req.body.password;
      bcrypt.hash(password, 10, (err, hash) => {
        const company_id = results.insertId;
        const formData = [
          req.body.email,
          req.body.firstname,
          req.body.lastname,
          req.body.username,
          req.body.headshot_path,
          hash,
          company_id,
        ];
        const sql =
          "INSERT INTO staff (email_address, firstname, lastname, username, headshot_path, password, company_id) VALUES (?,?,?,?,?,?,?)";

        connection.query(sql, formData, (err) => {
          if (err) {
            res.status(500).json({ flash: err.message });
          } else {
            res.status(200).json({ flash: "User has been signed up !" });
          }
        });
      });
    }
  );
});

// GET verify token validity (/api/auth/verify-token)
router.get("/verify-token", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    const { password, ...user } = decrypt;
    res.status(200).send(user);
  } catch (err) {
    return res.status(500).json(err.toString());
  }
});

module.exports = router;
