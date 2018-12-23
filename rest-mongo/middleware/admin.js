const jwt = require('jsonwebtoken')
const config = require('config')

function admin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(403).send('access denied')
    }
    next();
}

module.exports = admin;