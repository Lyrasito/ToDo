const fetch = require("node-fetch");
const User = require("../Models/User.model");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const fillUsers = async () => {
  for (let i = 0; i < 5; i++) {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: "User" + i,
          username: "user" + i,
          password: "password",
          isAdmin: false,
        },
      }),
    });
    console.log(i);
  }
};

fillUsers();

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
