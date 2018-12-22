const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Joi = require('joi')
const {Customer, ValidatCustomer} = require('../models/customer')




router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) res.status(404).send('Not found')
    res.send(customer)
})

router.post('/', async (req, res) => {
    const { error } = Joi.validate(req.body);
    if (error) {
        // if(!req.body.name || req.body.name.length<3){
        return res.status(400).send(error);

    }

    console.log("req.body ", req.body);
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    customer = await customer.save();
    res.send(customer);
})


router.put('/:id', async (req, res) => {

    const { error } = Joi.validate(req.body);
    if (error) {
        return res.status(400).send(error)
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    }, { new: true })
    if (!customer) res.status(404).send('Not found')

    res.send(customer);

})


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).send('Not found')
    res.send(customer);
})


module.exports = router;