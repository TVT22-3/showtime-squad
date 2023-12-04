package com.showtimesquad.showtimesquad.model.response;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GroupInfoResponse {
    String groupname;
    String owner;
    String groupPic;

    List<String> users;

    List<String> joinRequests;

    Integer[] news;

    public GroupInfoResponse(Group group) {
        this.groupname = group.getGroupname();
        this.owner = group.getOwner().getUsername();
        this.groupPic = group.getGroupPic();

        this.users = group.getUsers()
                .stream()
                .map(User::getUsername)
                .collect(Collectors.toList());

        this.news = group.getNews();
    }

    /**
     * Get partial data for niche cases
     * 
     * @param group
     * @param args[0] is owner?
     */
    public GroupInfoResponse(Group group, boolean... args) {
        if (args.length > 0 && args[0] == true) {
            // is owner
            this.joinRequests = group.getJoinRequests()
                    .stream()
                    .map(User::getUsername)
                    .collect(Collectors.toList());
            return;
        }
    }

    // getters and setters

    public Integer[] getNews() {
        return this.news;
    }

    public void setNews(Integer[] news) {
        this.news = news;
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

    public List<String> getJoinRequests() {
        return this.joinRequests;
    }

    public void setJoinRequests(List<String> joinRequests) {
        this.joinRequests = joinRequests;
    }

}
