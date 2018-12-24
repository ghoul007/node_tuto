const lib = require('../lib')

describe('absolute', () => {

    it('should return a postive number if input is postive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1)
    });

    it('should return a postive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1)
    });

    it('should return a zero number if input is zero', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0)
    });
});

describe('greet', () => {
    it('shoul return the greeting message', () => {
        const result = lib.greet('Ahmed');
        expect(result).toMatch(/welcome Ahmed/)
        // expect(result).toContain("welcome Ahmed")
    });
});


describe('get Currencies', () => {
    it('shoul return supported currenceies', () => {
        const result = lib.getCurrencies();
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
        expect(result[0]).toBe('USD')
        expect(result.length).toBe(3)
        expect(result).toContain('EUR')
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    });
});


describe('getProduct', () => {
    it('shoul return the product with the gieven id', () => {
        const result = lib.getProduct(1);
        // expect(result).toBe({ id: 1, price: 10 }) // check reference of object
        expect(result).toEqual({ id: 1, price: 10 })
        expect(result).toMatchObject({ id: 1, price: 10 })
        expect(result).toHaveProperty('id', 1)
    });
});



describe('register user', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(
            a => {
                expect(() => { lib.registerUser(a) }).toThrow();
            }
        )
    });
    it('shoul retun a user if valid username is passed', () => {
        const result = lib.registerUser('ahmed');
        expect(result).toMatchObject({'username': 'ahmed'})
    });
});