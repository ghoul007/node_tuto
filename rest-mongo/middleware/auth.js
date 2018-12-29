const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) res.status(401).send('access denied');
    try {
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        req.user = decoded
        next();
    } catch (error) {
        res.send(400).send('invalid token.')
    }
}


module.exports = auth;