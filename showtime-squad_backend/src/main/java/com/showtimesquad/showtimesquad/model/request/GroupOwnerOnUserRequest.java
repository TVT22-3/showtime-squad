package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Request DTO for owner on user interaction
 */
public class GroupOwnerOnUserRequest extends GroupRequest {

    @NotBlank
    private String another;

    public String getAnother() {
        return this.another;
    }

    public void setAnother(String groupname) {
        this.another = groupname;
    }
}
