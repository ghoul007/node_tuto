const express = require('express')
const home = require('../routes/home')
const courses = require('../routes/courses')
const customers = require('../routes/customers')
const rentals = require('../routes/rentals')
const users = require('../routes/users')
const auth = require('../routes/auth')
const returns = require('../routes/returns')
const error = require('../middleware/error')

module.exports = function (app) {

    app.use('/api/courses', courses)
    app.use('/api/customers', customers)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use('/api/returns', returns)
    app.use('/', home)

    app.use(error)
}