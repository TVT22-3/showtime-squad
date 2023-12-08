/**
 * This file contains the definition of the ListInfoResponse class.
 * The ListInfoResponse class is responsible for representing the response data
 * for the list information in the Showtime Squad application.
 */
package com.showtimesquad.showtimesquad.model.response;

import java.util.List;

import jakarta.validation.constraints.NotBlank;

/**
 * Represents a response containing a list of information.
 */
public class ListInfoResponse {
    private String name;
    private List<String> items;

    /**
     * Constructs a new ListInfoResponse object with the specified name and items.
     *
     * @param name  the name of the list
     * @param items the items in the list
     */
    public ListInfoResponse(String name, List<String> items) {
        this.name = name;
        this.items = items;
    }

    /**
     * Returns the name of the list.
     *
     * @return the name of the list
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the list.
     *
     * @param name the name of the list
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns the items in the list.
     *
     * @return the items in the list
     */
    public List<String> getItems() {
        return items;
    }

    /**
     * Sets the items in the list.
     *
     * @param items the items in the list
     */
    public void setItems(List<String> items) {
        this.items = items;
    }

}
