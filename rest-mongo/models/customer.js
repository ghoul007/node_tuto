const mongoose = require('mongoose')
const Joi = require('joi')
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    isGold: {
        type: Boolean,
        default: false
    }
}))



function ValidatCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema);
}


module.exports.Customer = Customer;
module.exports.ValidatCustomer = ValidatCustomer;