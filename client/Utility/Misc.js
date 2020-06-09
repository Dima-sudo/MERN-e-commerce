

/**
 * @param {number} number - Receives an integer
 * @returns {number} a random number from 0 up to that number - 1
 */

export const getRandIndex = (number) => {
    return Math.floor(Math.random() * number);
 }
//

/**
 * @param {number} number - Receives an integer
 * @returns {number} whether the input value is a valid integer
 * 
 * Example: 
 * 
 * '123' => true
 * '1a2' => false
 * 'abc' => false
 * 
 */

export const isNumeric = (value) => {
    return /^-{0,1}\d+$/.test(value);
}