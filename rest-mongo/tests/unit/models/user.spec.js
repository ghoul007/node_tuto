const { User } = require('../../../models/user')
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose')

describe('user.generate token', () => {
    it('shoul return valid json token', () => {
        const  p ={ _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true }
        const user = new User(p);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        expect(decoded).toMatchObject(p)
    });
});