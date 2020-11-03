const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME, 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    }).then(() => {
    console.log('mongodb connected')
}).catch((err) => {console.log(err.message)})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
});