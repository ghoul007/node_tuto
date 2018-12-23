const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/courses').then(
        () => winston.info('Connected to mongoDB')
    )
}

