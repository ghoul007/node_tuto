const express = require('express');
const router = express.Router();


const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
    { id: 4, name: "course4" }
]


router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    // res.send(req.query) // ?name=&
    res.send(courses.find(c => c.id === +req.params.id) || 'Not found')
})

router.post('/', (req, res) => {
    const { error } = Joi.validate(req.body);
    if (error) {
        // if(!req.body.name || req.body.name.length<3){
        return res.status(400).send(error);

    }
    const course = { name: req.body.name, id: courses.length + 1 };
    courses.push(course);
    res.send(courses);
})


router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === +req.params.id)
    if (!course) res.status(404).send('Not found')
    const { error } = Joi.validate(req.body);
    if (error) {
        return res.status(400).send(error)
    }

    course.name = req.body.name;
    res.send(courses);

})


router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === +req.params.id)
    if (!course) return res.status(404).send('Not found')
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses);
})

function ValidatCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    }
    return Joi.validate(course, schema);
}

module.exports = router;