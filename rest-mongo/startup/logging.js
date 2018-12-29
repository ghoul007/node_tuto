const winston = require('winston')
// require('winston-mongodb')

module.exports = function(){

    // process.on('uncaughtException', (ex) => {
        //     winston.error(ex.message, ex);
        //     process.exit(1)
        // })
        
        winston.handleExceptions(
            new winston.transports.Console({colorize:'true', prettyPrint: true}),
            new winston.transports.File({filename:'uncaughtException.log'}),
        )
        
        process.on('unhandledRejection', (ex) => {
    // winston.error(ex.message, ex)
    // process.exit(1)
    throw ex
})

winston.add(winston.transports.File, { filename: "logfile.log" })
// winston.add(winston.transports.MongoDB, {
//     db: "mongodb://localhost:27017/courses",
//     level: "error"
// })

// throw new Error('hhhh')
// const p = Promise.reject(new Error('fff'));
// p.then()

}