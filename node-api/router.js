const express = require("express");
const createError = require('http-errors')
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require("./jwt_helper");
const taskRouter = require('./taskRouter')
const User = require('../Models/User.model')
const router = express.Router();

router.use('/tasks', taskRouter)

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
  const user = await User.findOne({username: req.body.username})
  if(req.body.password === user.password) {
    req.user = user;
    next();
  } else {
    res.sendStatus(401)
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
  const newUser = req.body.user;
  const user = new User(newUser);
  const savedUser = await user.save();
  res.send({user: savedUser})
})

router.post("/login", auth, async (req, res) => {
  
  const accessToken = await signAccessToken(req.user);
  const refreshToken = await signRefreshToken(req.user);
  res.status(200).send({ accessToken, refreshToken });
});

router.post("/authenticate", verifyAccessToken, async (req, res) => {
  res.send({token: req.token})
})

router.post('/refresh-token', async (req, res, next) => {
  try {
    const {refreshToken} = req.body

    if(!refreshToken) {
        throw createError.BadRequest()
    }
    const user = await verifyRefreshToken(refreshToken);
    //console.log("user in refresh token route", user);
    const accessToken = await signAccessToken(user);
    //console.log(accessToken)
    const newRefreshToken = await signRefreshToken(user);
    res.send({ accessToken: accessToken, refreshToken: newRefreshToken })
} catch(err) {
    next(err)
}
})

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/getData", isLoggedIn, (req, res) => {
  res.json("data");
});


module.exports = {users, router}