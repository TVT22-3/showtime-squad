package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotBlank;

public class GroupRequest {

    @NotBlank
    private String groupname;

    public String getGroupname() {
        return this.groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

}
