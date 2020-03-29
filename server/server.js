const express = require("express");
const bodyParser = require("body-parser");
const decorator = require("./database/decorator");
const app = express();
const PORT = process.env.EXPRESS_HOST_PORT || 8080;

app.use(express.static("./server/public"));

//for checkAuth() middleware --start 1 of 2
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const client = redis.createClient({ url: process.env.REDIS_URL });
// --end

const cards = require("./api/cards");
const boards = require("./api/boards");
const users = require("./api/users");
const labels = require("./api/labels");
const lists = require("./api/lists");
const auth = require("./api/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(decorator);
//for checkAuth() middleware --start 2 of 2

app.use(
  session({
    store: new RedisStore({ client }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send({ message: "You have not been authenticated;" });
  }
}
//end

app.use("/api/users", checkAuth, users);
app.use("/api/auth", auth);
app.use("/api/cards", checkAuth, cards);
app.use("/api/boards", checkAuth, boards);
app.use("/api/labels", checkAuth, labels);
app.use("/api/lists", checkAuth, lists);

app.get("/smoke", (req, res) => {
  return res.send("There's smoke in the server.");
});

app.listen(PORT, () => {
  console.log("-------------------------------");
  console.log(`PORT: ${PORT}, at your service.`);
  console.log("-------------------------------");
  console.log("-------------------------------");
});
