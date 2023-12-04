package com.showtimesquad.showtimesquad.util;

import java.lang.reflect.Array;

public class CustomArrays {

    public static <T> void removeElements(T[] arr, T element) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == null) {
                break;
            }

            if (arr[i].equals(element)) {
                arr[i] = null;
            }
        }
        siftNullsToRight(arr);
    }

    public static <T> void siftNullsToLeft(T[] arr) {
        int writeIndex = arr.length - 1;

        for (int i = arr.length - 1; i >= 0; i--) {
            if (arr[i] != null) {
                arr[writeIndex--] = arr[i];
            }
        }

        while (writeIndex >= 0) {
            arr[writeIndex--] = null;
        }
    }

    public static <T> void siftNullsToRight(T[] arr) {
        int writeIndex = 0;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != null) {
                arr[writeIndex++] = arr[i];
            }
        }

        while (writeIndex < arr.length) {
            arr[writeIndex++] = null;
        }
    }

    private static <T> void printArray(T[] arr) {
        for (T element : arr) {
            System.out.print(element + ", ");
        }
        System.out.println();
    }

    public static <T> void addToLast(T[] arr, T element) throws ArrayIndexOutOfBoundsException {
        if (arr[arr.length - 1] != null) {
            throw new ArrayIndexOutOfBoundsException("Array is already full");
        }

        if (arr.length == 1) {
            arr[0] = element;
            return;
        }

        for (int i = arr.length - 1; i >= 0; i--) {
            if (arr[i] != null) {
                arr[i + 1] = element;
                return;
            }
        }
    }

    public static <T> void shiftElements(T[] arr, int to, int from) throws IllegalArgumentException {
        if (from < to || from >= arr.length || to >= arr.length) {
            throw new IllegalArgumentException();
        }

        while (from < arr.length) {
            arr[to++] = arr[from++];
        }

        while (to < arr.length) {
            arr[to++] = null;
        }
    }

    @SuppressWarnings("unchecked")
    public static <T> T[] realloc(T[] arr, int newSize) throws IllegalArgumentException, OutOfMemoryError {
        if (arr.length > newSize) {
            throw new IllegalArgumentException();
        }

        T[] newArr = (T[]) Array.newInstance(arr.getClass().getComponentType(), newSize);

        System.arraycopy(arr, 0, newArr, 0, arr.length);

        return newArr;
    }
}
