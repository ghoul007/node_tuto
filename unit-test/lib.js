module.exports.absolute = function (number) {
    if (number > 0) return number;
    if (number < 0) return -number;
    return 0
}

module.exports.greet = function (name) {
    return 'welcome ' + name
}

module.exports.getCurrencies = function () {
    return ['USD', 'AUD', 'EUR']
}

module.exports.getProduct = function (productId) {
    return { id: productId, price: 10 }
}


module.exports.registerUser = function (username) {
    if (!username) throw new Error('Username is requred!')

    return { id: new Date().getTime(), username: username }
}
