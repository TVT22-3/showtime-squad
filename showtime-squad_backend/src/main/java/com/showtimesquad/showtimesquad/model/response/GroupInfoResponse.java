package com.showtimesquad.showtimesquad.model.response;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;

public class GroupInfoResponse {
    String groupname;
    String owner;
    String groupPic;

    @Autowired
    List<String> users;

    public GroupInfoResponse(Group group) {
        this.groupname = group.getGroupname();
        this.owner = group.getOwner().getUsername();
        this.groupPic = group.getGroupPic();

        this.users = group.getUsers()
                .stream()
                .map(User::getUsername)
                .collect(Collectors.toList());
    }

    public String getGroupname() {
        return this.groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getOwner() {
        return this.owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getGroupPic() {
        return this.groupPic;
    }

    public void setGroupPic(String groupPic) {
        this.groupPic = groupPic;
    }

    public List<String> getUsers() {
        return this.users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

}
