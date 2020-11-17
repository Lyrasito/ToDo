const express = require("express");
const router = express.Router();
const Task = require("../Models/Task.model");
const JWT = require("jsonwebtoken");
//const { verifyToken } = require('./router')

router.post("/", async (req, res, next) => {
  const { task } = req.body;
  const result = new Task(task);
  const savedTask = await result.save();
  res.send(savedTask);
});

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    res.status(401).send("Unauthorized request");
  }
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).send("Unauthorized Request");
    }
    req.payload = payload;
    next();
  });
};

router.get("/", verifyToken, async (req, res, next) => {
  const result = await Task.find();
  res.send(result);
});

router.patch("/:id", async (req, res, next) => {
  await Task.updateOne({ id: req.params.id }, { $set: req.body });
  const task = await Task.findOne({ id: req.params.id });
  res.send({ task });
});

module.exports = router;
