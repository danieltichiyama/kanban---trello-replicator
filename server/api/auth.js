const express = require("express");
const router = express.Router();

//authentication dependencies
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const saltRounds = 12;
const User = require("../database/models/User");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const client = redis.createClient({ url: process.env.REDIS_URL });

router.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, done) {
      return new User({ username })
        .fetch({ require: false })
        .then(user => {
          console.log("user", user);

          if (user === null) {
            return done(null, false, { message: "bad username or password" });
          } else {
            user = user.toJSON();
            bcrypt
              .compare(password, user.password)
              .then(res => {
                if (res) {
                  return done(null, user); // this is the user that goes to serializeUser()
                } else {
                  return done(null, false, {
                    message: "bad username or password"
                  });
                }
              })
              .catch(err => {
                console.log("error: ", err);
                return done(err);
              });
          }
        })
        .catch(err => {
          console.log("error: ", err);
          return done(err);
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  return done(null, { id: user.id, email: user.email, name: user.username });
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  let response = { ...req.user };

  delete response.password;
  delete response.created_at;
  delete response.updated_at;
  return res.json(response);
});

router.post("/register", (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log(err);
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      }
      return new User(Object.assign({ ...req.body }, { password: hash }))
        .save()
        .then(user => {
          let response = { ...user.attributes };

          delete response.password;
          delete response.created_at;
          delete response.updated_at;

          return res.json(response);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.json({ session: {} });
});

router.get("/smoke", (req, res) => {
  return res.json({ message: "I see smoke in auth." });
});

module.exports = router;
