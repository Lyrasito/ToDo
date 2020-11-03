const crypto = require('crypto');
const dotenv = require('dotenv')

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');
console.log(process.env.ACCESS_TOKEN_SECRET)
//dotenv.config();
console.log(process.env.ACCESS_TOKEN_SECRET)