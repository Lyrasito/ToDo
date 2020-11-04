const express = require("express");

const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require("./jwt_helper");
const taskRouter = require('./taskRouter')

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