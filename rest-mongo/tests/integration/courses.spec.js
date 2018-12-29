const request = require('supertest')
const { Course } = require('../../models/course');
const { User } = require('../../models/user');
let server
describe('/api/courses', () => {
    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(async () => {
        server.close();
        await Course.remove({})
    })
    describe('GET /', () => {
        it('should retrun all courses', async () => {
            await Course.collection.insertMany([
                { name: 'course1' },
                { name: 'course2' }
            ])

            const res = await request(server).get('/api/courses');
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(g => g.name === 'course2')).toBeTruthy()

        });
    });

    describe('GET /:id', () => {
        it('should return a course if valid id is passed', async () => {
            const course = new Course({ name: 'course1' });
            await course.save();
            const res = await request(server).get('/api/courses/' + course._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', course.name);
        });
        it('should return  404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/courses/' + 55);
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {

        let token;
        let name;
        const exec = async () => {
            return await request(server)
                .post('/api/courses')
                .set('x-auth-token', token)
                .send({ name });
        }

        beforeEach(() => {
             token = new User().generateAuthToken();
             name = "ahemed1"
        })


        it('should return a 401 if client is not logged in', async () => {
            token = '';
            const res = await exec()
            expect(res.status).toBe(401);
        });
        it('should return a 400 if client is not invalid', async () => {
            name = "ahe"
            const res = await exec()
            expect(res.status).toBe(500);
        });
        it('should save the course if is valide', async () => {

            token = '';
            const res = await exec()

            const course = await Course.find({ name  })
            expect(course).not.toBeNull()
        });
        it('should return  the course if is valide', async () => {
            

            //TODO
            const res  = await exec()

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name')
        });
    });

});