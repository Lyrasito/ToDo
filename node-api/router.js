const express = require("express");
const createError = require("http-errors");
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("./jwt_helper");
const taskRouter = require("./taskRouter");
const User = require("../Models/User.model");
const router = express.Router();

router.use("/tasks", taskRouter);

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

const auth = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw createError.NotFound("User not registered.");

    const isMatch = await user.isValidPassword(req.body.password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");
    if (isMatch) {
      req.user = user;
      //console.log(user);
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    next(err);
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

router.post("/register", async (req, res, next) => {
  try {
    const newUser = req.body;
    const user = new User(newUser);
    const savedUser = await user.save();
    res.send({ user: savedUser });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", auth, async (req, res) => {
  const accessToken = await signAccessToken(req.user);
  const refreshToken = await signRefreshToken(req.user);

  res.status(200).send({ accessToken, refreshToken });
  await User.updateOne(
    { _id: req.user.id },
    { $set: { lastLogin: Date.now() } }
  );
});

router.post("/:id/comparePasswords", async (req, res) => {
  console.log("here");
  console.log(req.params.id);
  const user = await User.findOne({ _id: req.params.id });
  console.log(user);
  const isMatch = await user.isValidPassword(req.body.password);

  if (isMatch) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post("/authenticate", verifyAccessToken, async (req, res) => {
  res.send({ token: req.token });
});

router.post("/refresh-token", async (req, res, next) => {
  console.log("refreshtoken route");
  try {
    console.log("refreshtoken route");
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw createError.BadRequest();
    }
    const user = await verifyRefreshToken(refreshToken);
    //console.log("user in refresh token route", user);
    const accessToken = await signAccessToken(user);
    //console.log(accessToken)
    const newRefreshToken = await signRefreshToken(user);
    res.send({ accessToken: accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res) => {
  //let user = await User.findOne({ _id: req.params.id });

  try {
    await User.updateOne({ _id: req.params.id }, { $set: req.body });
    user = await User.findOne({ _id: req.params.id });
    res.send({ user });
  } catch (err) {
    console.log("error inside block");
    res.send({ error: err });
  }
});

router.get("/users", async (req, res) => {
  let users = await User.find();
  res.send({ users });
});

router.get("/getData", isLoggedIn, (req, res) => {
  res.json("data");
});

module.exports = { users, router };
