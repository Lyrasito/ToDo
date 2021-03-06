const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArchivedTaskSchema = new Schema({
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
  completedBy: {
    type: String,
    required: false,
  },
});

ArchivedTaskSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.__v;
    return ret;
  },
};

const ArchivedTask = mongoose.model("archived-task", ArchivedTaskSchema);

module.exports = ArchivedTask;
