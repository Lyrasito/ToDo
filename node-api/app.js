const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { signAccessToken, verifyAccessToken } = require("./jwt_helper");

app.use(express.json());
app.use(cors());

const users = [
  {
    username: "user",
    password: "password",
    name: "Marie",
    id: 1,
  },
  {
    username: "user1",
    password: "password1",
    name: "Kevin",
    id: 2,
  },
  {
    username: "user2",
    password: "password2",
    name: "Isabelle",
    id: 3,
  },
];

const validated = (req) => {
  const user = users.find((user) => user.username === req.body.username);
  const index = users.indexOf(user);
  if (req.body.password === users[index].password) {
    req.user = user;
    return true;
  } else {
    return false;
  }
};

const auth = (req, res, next) => {

  if (validated(req)) {
    req.isAuthenticated = true;
    next();
  } else {
    res.sendStatus(401);
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  }
  return res
    .status(400)
    .json({ statusCode: 400, message: "not authenticated" });
};

app.post("/login", auth, async (req, res) => {
  
  const accessToken = await signAccessToken(req.user);
  res.status(200).send({ token: accessToken });
});

app.post("/authenticate", verifyAccessToken, async (req, res) => {
  res.send({token: req.token})
})

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/getData", isLoggedIn, (req, res) => {
  res.json("data");
});

app.listen(3000, () => {
  console.log("App running at 3000");
});

module.exports = users