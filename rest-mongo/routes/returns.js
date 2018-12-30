const express = require('express');
const router = express.Router();
const { Rental } = require('../models/rental')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')


router.post('/', [auth, validate(validateRental)], async (req, res, ) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.courseId)
    if (!rental) return res.status(404).send('Rental not found')
    if (rental.dateReturned) return res.status(400).send('Retutn already processed')
    rental.dateReturned = 1;
    await rental.save();
    return res.status(200).send()
})



function validateRental(rental) {
    const schema = {
        customerId: Joi.objectid().required(),
        courseId: Joi.objectid().required()
    }

    return Joi.validate(rental, schema)
}


module.exports = router