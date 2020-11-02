const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { sign } = require("crypto");
const {users} = require('./app')



module.exports = {
  signAccessToken: (user) => {

    return new Promise((resolve, reject) => {
      const payload = {
        name: user.name,
        username: user.username,
        password: user.password
      };
      const secret = "secret secret";
      const options = {
        expiresIn: "15s",
        issuer: "localhost:4200",
        audience: user.id.toString()
      };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  },
};
