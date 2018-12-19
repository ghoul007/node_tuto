const Joi = require('joi');
const express = require('express')
const app = express()
app.use(express.json())

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
    { id: 4, name: "course4" }
]
app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.query) // ?name=&
    res.send(courses.find(c => c.id === +req.params.id) || 'Not found')
})

app.post('/api/courses', (req, res) => {
    const { error } = Joi.validate(req.body);
    if (error) {
        // if(!req.body.name || req.body.name.length<3){
        return res.status(400).send(error);

    }
    const course = { name: req.body.name, id: courses.length + 1 };
    courses.push(course);
    res.send(courses);
})


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === +req.params.id)
    if (!course) res.status(404).send('Not found')
    const { error } = Joi.validate(req.body);
    if (error) {
        return res.status(400).send(error)
    }

    course.name = req.body.name;
    res.send(courses);

})


app.delete('/api/courses/:id', (req, res) => {
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


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening port ${port}`))