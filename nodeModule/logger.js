const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log("message ", message);
        this.emit('messageLogged', { id: 1, rl: 'http://' })
    }
}

module.exports = Logger;