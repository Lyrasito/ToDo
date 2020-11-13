const fetch = require("node-fetch");
const User = require("../Models/User.model");
/*
const fillUsers = async () => {
  for (let i = 0; i < 5; i++) {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: {
          name: "User" + i,
          username: "user" + i,
          password: "password",
          isAdmin: false,
        },
      },
    });
    console.log(response);
    return response;
  }
};

fillUsers();
*/

const newUser = async () => {
  //console.log("something");
  const user = new User({
    name: "User",
    username: "user",
    password: "password",
    isAdmin: false,
  });
  // console.log(user);
  try {
    const savedUser = await user.save();
    console.log("user", savedUser);
  } catch (err) {
    console.log("err", err);
  }
};

newUser();
