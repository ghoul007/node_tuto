
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
        name: Joi.string().min(3).required(),
    }
    return Joi.validate(course, schema);
}


exports.ValidatCourse = ValidatCourse;
exports.Course = Course;