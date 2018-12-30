const mongoose = require('mongoose')
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const request = require('supertest')
describe('/api/returns', () => {
    let server;
    let customerId;
    let courseId;
    let rental;


    let token;
    let name;
    const exec = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, courseId });
    }

    beforeEach(async () => {
        server = require('../../index');
        customerId = mongoose.Types.ObjectId()
        courseId = mongoose.Types.ObjectId()
        token = new User().generateAuthToken();
        rental = new Rental({
            Customer: {
                _id: customerId,
                name: "12345",
                phone: "123456"
            },
            course: {
                _id: courseId,
                name: "12345"
            }
        });

        res = await rental.save()
    })
    afterEach(async () => {
        server.close();
        await Rental.remove({})
    })


    it('should return 401 if client not logged in', async () => {
        token = '';
        const res = await exec()
        expect(res.status).toBe(401);
    });

    it('should return 400 if courseId is not provided', async () => {
        courseId = ''
        const res = await exec()
        expect(res.status).toBe(400);
    });

    it('should return 400 if customerId is not provided', async () => {
        customerId = ''
        const res = await exec()
        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for the customer/movie', async () => {
        await Rental.remove({})
        const res = await exec()
        expect(res.status).toBe(404);
    });

    xit('should return 400 if return is already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save()
        const res = await exec()
        expect(res.status).toBe(400);
    });

    xit('should return 200 if we have a valid request', async () => {
        const res = await exec()
        expect(res.status).toBe(200);
    });

    it('should set the returnDate if input is valid', async () => {
        const res = await exec()
        const rentalInDb = await Rental.findById(rental._id)
        expect(rentalInDb.dateReturned).toBeDefined();
    });

});