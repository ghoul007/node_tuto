
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi');
const express = require('express')
const logger = require('./middleware/logger')
const home = require('./routes/home')
const courses = require('./routes/courses')
const app = express()

app.use('/api/courses', courses)
app.use('/', home)

app.set('view engine','pug');
app.set('views','./views');


console.log(`Application Name: ${config.get('name')}`)
console.log(`Application Mail: ${config.get('mail.host')}`)
console.log(`Application Passwod: ${config.get('pass')}`)


//in console =>  export NODE_ENV ='prod'
console.log(`app (NODE_ENV): ${app.get('env')}`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(helmet())

if (app.get('env') === 'development') {
    app.use(morgan('combined'));
    startupDebugger('morgan enabled')
}
dbDebugger('Connected to db');





const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening port ${port}`))