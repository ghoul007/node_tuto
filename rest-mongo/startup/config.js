const config = require('config')

module.exports = function() {
    
if (!config.get('jwtsecret')) {
    throw new Error('FATAL ERROR: jwtsecret is not defined');
}
}