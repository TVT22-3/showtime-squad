package com.showtimesquad.showtimesquad.model.response;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;

/**
 * Response DTO for sending back messages to users
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GroupInfoResponse {
    String groupname;
    String description;
    String owner;
    String groupPic;

    List<String> users;
    List<String> joinRequests;
    List<Integer> news;

    List<String> groups;
    List<Map<String, String>> groupsWithInfo;

    /**
     * For GET all groups route
     * 
     * @param allGroups
     */
    // public GroupInfoResponse(List<String> allGroups) {
    //     this.groups = allGroups;
    // }

    public GroupInfoResponse(List<Map<String, String>> groupsWithInfo) {
        this.groupsWithInfo = groupsWithInfo;
    }

    /**
     * Generic version that suits most cases
     * 
     * @param group
     */
    public GroupInfoResponse(Group group) {
        this.groupname = group.getGroupname();
        this.description = group.getDescription();
        this.owner = group.getOwner().getUsername();
        this.groupPic = group.getGroupPic();

        this.users = group.getUsers()
                .stream()
                .map(User::getUsername)
                .collect(Collectors.toList());

        this.news = group.getNews();
    }

    /**
     * Get partial data for niche cases, add booleans to args for more cases as to
     * not clutter this file with constructors
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

    public List<Map<String,String>> getGroupsWithInfo() {
        return this.groupsWithInfo;
    }

    public void setGroupsWithInfo(List<Map<String,String>> groupsWithInfo) {
        this.groupsWithInfo = groupsWithInfo;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getGroups() {
        return this.groups;
    }

    public void setGroups(List<String> allGroups) {
        this.groups = allGroups;
    }

    public List<Integer> getNews() {
        return this.news;
    }

    public void setNews(LinkedList<Integer> news) {
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
