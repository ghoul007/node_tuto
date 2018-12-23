const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true,
        minlength: 7
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtsecret'))
    return token
}
const User = mongoose.model('User', userSchema)


function ValidateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(7).required()
    }

    return Joi.validate(user, schema)
}

module.exports.User = User;
module.exports.ValidateUser = ValidateUser;