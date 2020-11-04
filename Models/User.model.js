const mongoose = require('mongoose')
//const { stringify } = require('querystring')
//const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.model('user', UserSchema)

/* const newTask = new Task({id: 1, submitter: "Marie", title: "Task2", description: "Task2 description", dueDate: "01/01/01", priority: 1, completed: false})
newTask.save(); */

module.exports = User