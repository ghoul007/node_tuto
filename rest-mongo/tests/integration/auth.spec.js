const request = require('supertest')
const { User } = require('../../models/user')
const { Course } = require('../../models/course')
describe('auth middleware', () => {

    beforeEach(() => { server = require('../../index') })
    afterEach(async() => { await server.close();   await Course.remove({}) })

    let token;

    const exec = () => {
        return request(server).post('/api/courses')
            .set('x-auth-token', token)
            .send({ name: "course1" })
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
    })
    it('should retun 401 if no token is provider', async() => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401)
    });
    it('should retun 400 if   token is invalid', async() => {
        token = 'zez';
        const res = await exec();
        expect(res.status).toBe(400)
    });
    it('should retun 200 if token is  valid', async() => {
        const res = await exec();
        expect(res.status).toBe(200)
    });
});