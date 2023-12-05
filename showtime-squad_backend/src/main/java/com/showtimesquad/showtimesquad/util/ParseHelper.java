package com.showtimesquad.showtimesquad.util;

public class ParseHelper {

    /**
     * Check that {@code String} contains a numeric value
     * @param str
     * @return
     */
    public static boolean isNumeric(String str) {
        return str != null && !str.isEmpty() && isInteger(str);
    }

    /**
     * Performs a try catch parseInt on {@code String} to determine if it's a valid {@code Integer}
     * @param str
     * @return
     */
    private static boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
