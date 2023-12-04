package com.showtimesquad.showtimesquad.util;

public class ParseHelper {

    public static boolean isNumeric(String str) {
        return str != null && !str.isEmpty() && isInteger(str);
    }

    private static boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
