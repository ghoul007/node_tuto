const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')
const Joi = require('joi')
const { User, ValidateUser } = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/', async (req, res) => {
    const { error } = ValidateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered')
    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})

module.exports = router