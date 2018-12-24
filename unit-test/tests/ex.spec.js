const ex1 = require('../ex1')

describe('exercice1', () => {
    it('should throw if an exception if input is not a number', () => {
        expect(() => { ex1.fizzBuzz('a') }).toThrow();
        expect(() => { ex1.fizzBuzz(null) }).toThrow();
        expect(() => { ex1.fizzBuzz(undefined) }).toThrow();
        expect(() => { ex1.fizzBuzz({}) }).toThrow();
    });



    it('should return fizzbuzz if input is devisible by  3 dnd 5', () => {
        const result =  ex1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz')
    });

    it('should return fizzbuzz if input is devisible by  3 dnd 5', () => {
        const result =  ex1.fizzBuzz(3);
        expect(result).toBe('Fizz')
    });
});