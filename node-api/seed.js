const fetch = require("node-fetch");
const User = require("../Models/User.model");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Task = require("../Models/Task.model");
dotenv.config();

const drop = async (collection, collectionName) => {
  const data = await collection.find();
  if (data) {
    mongoose.connection.db.dropCollection(collectionName, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(result);
      }
    });
  } else {
    return;
  }
};

const fillUsers = async () => {
  drop(User, "users");
  for (let i = 0; i < users.length; i++) {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users[i]),
    });
    console.log(i);
  }
};

const fillTasks = async () => {
  drop(Task, "tasks");
  for (let i = 0; i < tasks.length; i++) {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: tasks[i] }),
    });
    console.log(i);
  }
};

const users = [
  {
    name: "Marie",
    username: "user",
    email: "marie@email.com",
    password: "password",
    isAdmin: true,
  },
  {
    name: "Kevin",
    username: "user1",
    email: "kevin@email.com",
    password: "password",
    isAdmin: false,
  },
  {
    name: "Isabelle",
    username: "user2",
    email: "isabelle@email.com",
    password: "password",
    isAdmin: false,
  },
  {
    name: "Francis",
    username: "user3",
    email: "francis@email.com",
    password: "password",
    isAdmin: false,
  },
];

const tasks = [
  {
    submitter: "Marie",
    title: "Task 1",
    description: "Do task 1",
    dueDate: "01/01/01",
    priority: 2,
    completed: false,
  },
  {
    submitter: "Kevin",
    title: "Task 2",
    description: "Do task 2",
    dueDate: "02/02/02",
    priority: 3,
    completed: false,
  },
  {
    submitter: "Isabelle",
    title: "Task 3",
    description: "Do task 3",
    dueDate: "03/03/03",
    priority: 1,
    completed: false,
  },
  {
    submitter: "Francis",
    title: "Task 4",
    description: "Do task 4",
    dueDate: "04/04/04",
    priority: 2,
    completed: false,
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

fillUsers();
fillTasks();

/*
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");

  newUser();
});

const newUser = async () => {
  console.log("something");
  const user = new User({
    name: "User",
    username: "user",
    password: "password",
    isAdmin: false,
  });
  try {
    user.name = "something else";
    const savedUser = await user.save();
    console.log("user", savedUser);
  } catch (err) {
    console.log("err", err);
  }
};
*/
