const mongoose = require("mongoose");
//const { stringify } = require('querystring')
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  lastLogin: {
    type: Number,
    required: false,
  },
});

UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.__v;
    return ret;
  },
};

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre("updateOne", async function (next) {
  if (this.get("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.get("password"), salt);
      this.set("password", hashedPassword);
      console.log(this.get("password"));
      next();
    } catch (err) {
      next(err);
    }
  }
  if (this.get("isAdmin") === false) {
    try {
      const user = await User.findOne({ name: "Marie" });
      if (user._id.toString() === this.getFilter()._id) {
        next("Cannot remove admin status of that user.");
      }
    } catch (err) {
      next(err);
    }
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    console.log("password?", password, this.password);
    const isValid = await bcrypt.compare(password, this.password);
    console.log("valid", isValid);
    return isValid;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("user", UserSchema);

/* const newTask = new Task({id: 1, submitter: "Marie", title: "Task2", description: "Task2 description", dueDate: "01/01/01", priority: 1, completed: false})
newTask.save(); */

module.exports = User;
