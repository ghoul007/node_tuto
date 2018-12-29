
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const logger = require('./middleware/logger')
const winston = require('winston')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(helmet())

require('./startup/logging')();
require('./startup/routes')(app)
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


app.set('view engine', 'pug');
app.set('views', './views');

console.log(`Application Name: ${config.get('name')}`)
console.log(`Application Mail: ${config.get('mail.host')}`)
// console.log(`Application Passwod: ${config.get('pass')}`)
//in console =>  export NODE_ENV ='prod'
console.log(`app (NODE_ENV): ${app.get('env')}`)


if (app.get('env') === 'development') {
    app.use(morgan('combined'));
    startupDebugger('morgan enabled')
}
dbDebugger('Connected to db');
const port = process.env.PORT || 3000
const server = app.listen(port, () => winston.info(`listening port ${port}`))

module.exports = server;