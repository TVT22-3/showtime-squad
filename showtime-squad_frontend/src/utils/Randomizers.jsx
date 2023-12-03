/**
 * I totally asked chatGPT to convert this from my java code t. Miika
 * so if it doesn't work you can yell at me!
 */

/**
 * Generates random string of characters based on length and (optional, defaults to azAZ) range parameters
 * @param {number} len 0 or negative lengths effectively do nothing
 * @param  {...string[]} ranges optional (default "azAZ"), define how chars are generated to the string
 * @returns {string} random string with characters between specified ranges
 * @see toCharRanges()
 * @author Miika Tiihonen
 */
function randomString(len, ...ranges) {
    if (!ranges || ranges.length === 0) {
        ranges = toCharRanges("azAZ");
    }

    let str = '';

    for (let i = 0; i < len; i++) {
        str += randomChar(...ranges);
    }

    return str;
}

/**
 * convert string to pairs of chars
 * @param {string} rangesAsStr example usage: ("azAZ"), trims last character for odd str len
 * @returns {string[][]} pairs of chars as string[][]
 * @throws {Error} when given less than two characters to work with
 * @author Miika Tiihonen
 */
function toCharRanges(rangesAsStr) {
    const strLen = rangesAsStr.length;
    if (strLen < 2) {
        throw new Error("Can't work with less than two characters as a range");
    }

    // odd number of chars
    if (strLen % 2 !== 0) {
        rangesAsStr = rangesAsStr.substring(0, strLen - 1);
    }

    // move chars from string to string[][]
    const rangesAmount = strLen / 2;
    const ranges = new Array(rangesAmount);
    for (let i = 0; i < strLen; i += 2) {
        ranges[i / 2] = [rangesAsStr.charAt(i), rangesAsStr.charAt(i + 1)];
    }

    return ranges;
}

/**
 * 
 * @param {...string[]} ranges optional, (default range is max16b), example usage: ("az", "AZ")
 * @returns {string} char based on ranges. If no ranges are specified, returns between 0
 *         and max16b
 * @see toCharRanges()
 * @author Miika Tiihonen
 */
function randomChar(...ranges) {
    if (ranges.length === 0) {
        return String.fromCodePoint(Math.floor(Math.random() * (0x10FFFF + 1)));
    }

    // get start and end from ranges based on dice roll
    const dice = Math.floor(Math.random() * ranges.length);
    const start = ranges[dice][0];
    const end = ranges[dice][1];

    // get character that is in range
    const range = end.charCodeAt(0) - start.charCodeAt(0) + 1;
    const randomOffset = Math.floor(Math.random() * range);

    return String.fromCharCode(start.charCodeAt(0) + randomOffset);
}

// Export the functions
export {
    randomString,
    toCharRanges,
    randomChar,
}