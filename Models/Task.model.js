const mongoose = require("mongoose");
//const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  submitter: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  completedTimestamp: {
    type: Number,
    required: false,
  },
});

const Task = mongoose.model("task", TaskSchema);

/* const newTask = new Task({id: 1, submitter: "Marie", title: "Task2", description: "Task2 description", dueDate: "01/01/01", priority: 1, completed: false})
newTask.save(); */

module.exports = Task;
