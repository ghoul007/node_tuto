const express = require('express');
const config = require('config')
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require('joi')
const { User } = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password')
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('invalid  password')
    const token = user.generateAuthToken();
   
    res.send(token)
})

function validate(user) {
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().min(7).required()
    }

    return Joi.validate(user, schema)
}

module.exports = router