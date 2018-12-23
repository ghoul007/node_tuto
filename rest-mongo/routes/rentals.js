const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require('joi')
const { Rental, validateRental } = require('../models/rental')
const { Customer } = require('../models/customer')
const { Course } = require('../models/course')
const Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
})

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // if (!mongoose.Types.ObjectId.isValid(req.body.customerId)) {
    //     return res.status(400).send('Invalid customer')
    // }
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(400).send('Invalid course');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        course: {
            _id: course._id,
            name: course.name,
        }
    })

    try {
        Fawn.Task()
            .save('rentals', rental)
            .update('courses', { _id: course._id }, { name: course.name + "!" })
            .run();
        // rental = await rental.save();
        // course.name = course.name + "!";
        // course.save();
        res.send(rental)
    } catch (error) {
        res.status(500).send('Someting failed')
    }
})

module.exports = router