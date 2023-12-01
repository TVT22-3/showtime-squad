package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotBlank;

public class CreateGroupRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String groupname;

    private String groupPic;

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGroupname() {
        return this.groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getGroupPic() {
        return this.groupPic;
    }

    public void setGroupPic(String groupPic) {
        this.groupPic = groupPic;
    }

}
