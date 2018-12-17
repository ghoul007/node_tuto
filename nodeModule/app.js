const EventEmitter = require('events');
const Logger = require('./logger');

const logger = new Logger()

logger.on('messageLogged', (arg) => {
    console.log('logged called', arg)
})

logger.log('message')