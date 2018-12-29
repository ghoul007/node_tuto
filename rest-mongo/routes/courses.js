const valideObjectID = require('../middleware/validateObjectId')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require('joi')
const { ValidatCourse, Course } = require('../models/course')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const asyncMiddleware = require('../middleware/async')
require('express-async-errors');

// router.get('/', auth, admin, async (req, res) => {
// router.get('/', auth, asyncMiddleware(async (req, res,) => {
router.get('/', async (req, res, ) => {
    const courses = await Course.find().sort('name');
    res.send(courses)
})

router.get('/:id', valideObjectID, asyncMiddleware(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) res.status(404).send('Not found')
    res.send(course)
}))

router.post('/', auth, async (req, res) => {
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


router.put('/:id', auth, async (req, res) => {

    const { error } = Joi.validate(req.body);
    if (error) {
        return res.status(400).send(error)
    }
    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!course) res.status(404).send('Not found')

    res.send(course);

})


router.delete('/:id', auth, async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).send('Not found')
    res.send(course);
})


module.exports = router;