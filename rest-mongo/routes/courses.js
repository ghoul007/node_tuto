const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require('joi')
const {ValidatCustomer, Customer} = require('../models/customer')




router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name');
    res.send(courses)
})

router.get('/:id', async(req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) res.status(404).send('Not found')
    res.send(course)
})

router.post('/', async (req, res) => {
    const { error } = Joi.validate(req.body);
    if (error) {
        // if(!req.body.name || req.body.name.length<3){
        return res.status(400).send(error);

    }

    console.log("req.body ", req.body);
    let course = new Course({ name: req.body.name });
    course = await course.save();
    res.send(course);
})


router.put('/:id', async (req, res) => {

    const { error } = Joi.validate(req.body);
    if (error) {
        return res.status(400).send(error)
    }
    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!course) res.status(404).send('Not found')

    res.send(course);

})


router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).send('Not found')
    res.send(course);
})


module.exports = router;