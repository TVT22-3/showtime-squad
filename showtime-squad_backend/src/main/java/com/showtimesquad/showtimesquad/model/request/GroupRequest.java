package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for generic interaction with groups
 */
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
