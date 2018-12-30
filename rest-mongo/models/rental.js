const mongoose = require('mongoose')
const Joi = require('joi')
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true
            }
        })
    },
    course: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateReturned: {
        type: Date,
        required: true,
        default: Date.now()
    },
    rentalFree: {
        type: Number,
        min: 0
    }
})

rentalSchema.statics.lookup = function (customerId, courseId) {
    return this.findOne({
        "customer._id":  customerId,
        "course._id":  courseId
    })
}

const Rental = mongoose.model('Rental', rentalSchema)


function validateRental(rental) {
    const schema = {
        customerId: Joi.objectid().required(),
        courseId: Joi.objectid().required()
    }

    return Joi.validate(rental, schema)
}



module.exports.Rental = Rental;
module.exports.validateRental = validateRental;