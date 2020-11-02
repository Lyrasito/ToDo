const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { sign } = require("crypto");

module.exports = {
  signAccessToken: (userId) => {
    console.log("here?");
    return new Promise((resolve, reject) => {
      const payload = {
        name: "marie",
      };
      const secret = "secret secret";
      const options = {};

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  },
};
