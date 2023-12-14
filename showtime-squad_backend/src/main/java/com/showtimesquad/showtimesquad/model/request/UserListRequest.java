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
    private String username;

    private List<Integer> movieIds;

    public String getListname() {
        return this.listname;
    }

    public void setListname(String listname) {
        this.listname = listname;
    }

    public List<Integer> getMovieIds() {
        return this.movieIds;
    }

    public void setMovieIds(List<Integer> movieIds) {
        this.movieIds = movieIds;
    }

    public String getGroupname() {
        return this.groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}