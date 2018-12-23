
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi)
const express = require('express')
const logger = require('./middleware/logger')
const home = require('./routes/home')
const courses = require('./routes/courses')
const customers = require('./routes/customers')
const rentals = require('./routes/rentals')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/courses').then(
    ()=> console.log('Connected to mongoDB')
)


app.use('/api/courses', courses)
app.use('/api/customers', customers)
app.use('/api/rentals', rentals)
app.use('/', home)

app.set('view engine','pug');
app.set('views','./views');


console.log(`Application Name: ${config.get('name')}`)
console.log(`Application Mail: ${config.get('mail.host')}`)
console.log(`Application Passwod: ${config.get('pass')}`)


//in console =>  export NODE_ENV ='prod'
console.log(`app (NODE_ENV): ${app.get('env')}`)


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