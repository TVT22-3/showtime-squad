package com.showtimesquad.showtimesquad.testutil;

/**
 * Collection of static helper methods for random data generation
 */
public class Randomizers {

    /**
     * Generates random string of characters based on length and (optional, defaults to azAZ) range parameters
     * @param len 0 or negative lengths effectively do nothing
     * @param ranges optional (default "azAZ"), define how chars are generated to the string, example usage ("az".toCharArray(), "AZ".toCharArray()) or (toCharRanges("azAZ")) 
     * @return random string with characters between specified ranges
     * @see toCharRanges()
     * @author Miika Tiihonen
     */
    public static String randomString(int len, char[]... ranges) {
        if (ranges.length == 0) {
            ranges = toCharRanges("azAZ");
        }

        StringBuilder str = new StringBuilder();

        for (int i = 0; i < len; i++) {
            str.append(randomChar(ranges));
        }

        return str.toString();
    }

    /**
     * convert string to pairs of chars
     * @param rangesAsStr example usage: ("azAZ"), trims last character for odd str len
     * @return pairs of chars as char[][]
     * @throws IllegalArgumentException when given less than two characters to work with
     * @author Miika Tiihonen
     */
    public static char[][] toCharRanges(String rangesAsStr) throws IllegalArgumentException {
        int strLen = rangesAsStr.length();
        if (strLen < 2) {
            throw new IllegalArgumentException("Can't work with less than two characters as a range");
        }

        // odd number of chars
        if (strLen % 2 != 0) {
            rangesAsStr = rangesAsStr.substring(0, strLen - 1);
            strLen--;
        }

        // move chars from string to char[][]
        int rangesAmount = strLen / 2;
        char[][] ranges = new char[rangesAmount][2];
        for (int i = 0; i < strLen; i += 2) {
            ranges[i / 2][0] = rangesAsStr.charAt(i);
            ranges[i / 2][1] = rangesAsStr.charAt(i + 1);
        }

        return ranges;
    }

    /**
     * 
     * @param ranges example usage: ("azAZ"), must contain at least two chars
     * @return char based on ranges. If no ranges are specified, returns between 0
     *         and max16b
     * @see toCharRanges()
     * @author Miika Tiihonen
     */
    public static char randomChar(String ranges) {
        return randomChar(toCharRanges(ranges));
    }

    /**
     * 
     * @param ranges optional, (default range is max16b), example usage: ("az".toCharArray(), "AZ".toCharArray())
     * @return char based on ranges. If no ranges are specified, returns between 0
     *         and max16b
     * @see toCharRanges()
     * @author Miika Tiihonen
     */
    public static char randomChar(char[]... ranges) {
        if (ranges.length == 0) {
            return (char) (Math.random() * Character.MIN_SUPPLEMENTARY_CODE_POINT);
        }

        // get start and end from ranges based on dice roll
        int dice = (int) (Math.random() * ranges.length);
        char start = ranges[dice][0];
        char end = ranges[dice][1];

        // get character that is in range
        int range = end - start + 1;
        int randomOffset = (int) (Math.random() * range);

        return (char) (start + randomOffset);
    }
}
