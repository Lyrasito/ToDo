const express = require('express')
const router = express.Router();
const Task = require('../Models/Task.model')

router.post('/', async (req, res, next) => {
    const { task } = req.body
    const result = new Task(task);
    const savedTask = await result.save();
    res.send(savedTask)
})

router.get('/', (req, res, next) => {
    const result = Task.find();
})
module.exports = router