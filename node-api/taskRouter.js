const express = require("express");
const router = express.Router();
const Task = require("../Models/Task.model");
const ArchivedTask = require("../Models/Archived-Task.model");
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
  await Task.updateOne({ _id: req.params.id }, { $set: req.body });
  const task = await Task.findOne({ id: req.params.id });
  res.send({ task });
});

router.delete("/:id", async (req, res, next) => {
  await Task.findOneAndDelete({ _id: req.params.id });
  res.status(204).send({ message: "Successfully deleted." });
});

//Archive Task
router.post("/:id/archive", async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  const newTask = {
    submitter: task.submitter,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    completed: task.completed,
    completedTimeStamp: task.completedTimeStamp,
  };
  const archivedTask = new ArchivedTask(newTask);
  console.log("archived task", archivedTask);
  const savedArchivedTask = await archivedTask.save();
  await Task.findOneAndDelete({ _id: req.params.id });
  res.send({ task: savedArchivedTask });
});

//Get Archived Tasks
router.get("/archive", async (req, res, next) => {
  const archivedTasks = await ArchivedTask.find();
  res.send({ tasks: archivedTasks });
});

module.exports = router;
