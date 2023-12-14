/**
 * This file contains the definition of the ListInfoResponse class.
 * The ListInfoResponse class is responsible for representing the response data
 * for the list information in the Showtime Squad application.
 */
package com.showtimesquad.showtimesquad.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.model.UserList;

import jakarta.validation.constraints.NotBlank;

/**
 * Represents a response containing a list of information.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ListInfoResponse {
    String listname;
    String username;
    String groupname;
    List<Integer> movieIds;

    List<String> lists;

    /*
     * For GET all lists route
     * 
     * @param allLists
     */
    public ListInfoResponse(List<String> allLists) {
        this.lists = allLists;
    }

    public ListInfoResponse(UserList list) {
        this.listname = list.getListName();
        this.username = list.getUser().getUsername();
        this.groupname = list.getGroup().getGroupname();
        this.movieIds = list.getMovieIds();
    }

    // getters and setters

    public List<Integer> getMovieIds() {
        return this.movieIds;
    }

    public void setMovieIds(List<Integer> movieIds) {
        this.movieIds = movieIds;
    }

    public List<String> getLists() {
        return this.lists;
    }

    public void setLists(List<String> lists) {
        this.lists = lists;
    }

    public String getListname() {
        return this.listname;
    }

    public void setListname(String listname) {
        this.listname = listname;
    }

    public String getGroupname() {
        return this.groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}