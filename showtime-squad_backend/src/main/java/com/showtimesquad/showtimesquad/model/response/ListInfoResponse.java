package com.showtimesquad.showtimesquad.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ListInfoResponse {
    private String listname;
    private String username;
    private String groupname;
    private List<Integer> movieIds;

    public ListInfoResponse(String listname, String username, String groupname, List<Integer> movieIds) {
        this.listname = listname;
        this.username = username;
        this.groupname = groupname;
        this.movieIds = movieIds;
    }

    public String getListname() {
        return listname;
    }

    public void setListname(String listname) {
        this.listname = listname;
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

    public List<Integer> getMovieIds() {
        return movieIds;
    }

    public void setMovieIds(List<Integer> movieIds) {
        this.movieIds = movieIds;
    }
}