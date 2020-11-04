const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { sign } = require("crypto");
const  { users } = require('./router')
const dotenv = require('dotenv')
dotenv.config();


module.exports = {
  signAccessToken: (user) => {

    return new Promise((resolve, reject) => {
      const payload = {
        name: user.name,
        username: user.username,
        password: user.password,
        id: user.id
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "5s",
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
        req.user = payload
        req.token = token
        next();
    })
},

  signRefreshToken: (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
          name: user.name,
          username: user.username,
          password: user.password,
          id: user.id
        }
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: "1y",
            issuer: "localhost:3000",
            audience: user.id.toString()
        }
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) {
                
                return reject(createError.InternalServerError())
            }
            resolve(token);
        })
    })
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if(err) {
                return reject(createError.Unauthorized())
            }
            const user = payload;
            resolve(user);
        })
    })
}
};
