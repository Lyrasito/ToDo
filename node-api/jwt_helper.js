const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { sign } = require("crypto");
const {users} = require('./app')
const dotenv = require('dotenv')
dotenv.config();


module.exports = {
  signAccessToken: (user) => {

    return new Promise((resolve, reject) => {
      const payload = {
        name: user.name,
        username: user.username,
        password: user.password
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1500s",
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

  verifyAccessToken: (req, res, next) => {
    if(!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }
    const authHeaders = req.headers['authorization']
    const bearerToken = authHeaders.split(' ')
    const token = bearerToken[1]
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) { 
            err.name === "JsonWebTokenError" ?  next(createError.Unauthorized()) : next(createError.Unauthorized(err.message))
            console.log(err);
        }
        req.payload = payload
        req.token = token
        next();
    })
},
};
