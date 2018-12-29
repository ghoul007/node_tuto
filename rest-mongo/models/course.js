const mongoose = require('mongoose')
const Joi = require('joi')
const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
}))


function ValidatCourse(course) {
    const schema = {
        name: Joi.string().min(5).required(),
    }
    return Joi.validate(course, schema);
}


exports.ValidatCourse = ValidatCourse;
exports.Course = Course;