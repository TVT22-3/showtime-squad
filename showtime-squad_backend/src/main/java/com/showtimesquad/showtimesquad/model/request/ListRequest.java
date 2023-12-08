package com.showtimesquad.showtimesquad.model.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;

public class ListRequest {

    @NotBlank
    private String listname;
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

}
