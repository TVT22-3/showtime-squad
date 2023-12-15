package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

/**
 * Represents a request object for creating a user list.
 */
public class UserListRequest {

    @NotBlank
    private String listname;
    private String groupname;
    @NotBlank
    private String username;
    private List<Integer> movieIds;

    public UserListRequest(String listname, String groupname, String username, List<Integer> movieIds) {
        this.listname = listname;
        this.groupname = groupname;
        this.username = username;
        this.movieIds = movieIds;
    }

    public UserListRequest() {
    }

    public UserListRequest(String listname, String username, List<Integer> movieIds) {
        this.listname = listname;
        this.username = username;
        this.groupname = null;
        this.movieIds = movieIds;
    }

    public UserListRequest(String listname, String username) {
        this.listname = listname;
        this.username = username;
        this.groupname = null;
        this.movieIds = null;
    }

    public List<Integer> getMovieIds() {
        return movieIds;
    }

    public void setMovieIds(List<Integer> movieIds) {
        this.movieIds = movieIds;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGroupname() {
        return groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getListname() {
        return this.listname;
    }

    public void setListname(String listname) {
        this.listname = listname;
    }
}