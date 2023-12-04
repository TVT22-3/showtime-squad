package com.showtimesquad.showtimesquad.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import com.showtimesquad.showtimesquad.util.CustomArrays;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 45)
    @Column(name = "group_name", nullable = false)
    private String groupname;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "news", columnDefinition = "integer[]")
    private Integer[] news;

    @Size(max = 255)
    @Column(name = "group_pic")
    private String groupPic;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "groups_users", joinColumns = @JoinColumn(name = "groups_id"), inverseJoinColumns = @JoinColumn(name = "users_id"))
    private Set<User> users = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "groups_join_requests", joinColumns = @JoinColumn(name = "groups_id"), inverseJoinColumns = @JoinColumn(name = "users_id"))
    private Set<User> joinRequests = new HashSet<>();

    public Group() {
    }

    public Group(String groupname, User owner) {
        this.groupname = groupname;
        this.owner = owner;
        users.add(owner);
    }

    public Group(String groupname, User owner, Integer[] news) {
        this.groupname = groupname;
        this.owner = owner;
        users.add(owner);
        this.news = news;
    }

    public void removeNews(Integer newsIdToRemove) {
        CustomArrays.removeElements(this.news, newsIdToRemove);
    }

    public void removeNewsAtIndex(Integer indexToRemove) throws IndexOutOfBoundsException {
        if (indexToRemove < 0 || indexToRemove >= 10) {
            throw new IndexOutOfBoundsException();
        }

        this.news[indexToRemove] = null;
        
        CustomArrays.shiftElements(this.news, indexToRemove, indexToRemove + 1);
        this.news = CustomArrays.realloc(this.news, this.news.length - 1);
    }

    public void addNews(Integer newsToAdd) {
        if (this.news == null) {
            // create new array
            this.news = new Integer[1];
            this.news[0] = newsToAdd;
            return;
        }

        if (this.news.length >= 10) {
            // remove oldest
            CustomArrays.shiftElements(this.news, 0, 1);
        } else {
            // grow array
            this.news = CustomArrays.realloc(this.news, this.news.length + 1);
        }

        CustomArrays.addToLast(this.news, newsToAdd);
    }

    // getters and setters

    public Integer[] getNews() {
        return this.news;
    }

    public void setNews(Integer[] news) {
        this.news = news;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupname() {
        return this.groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public User getOwner() {
        return this.owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getGroupPic() {
        return this.groupPic;
    }

    public void setGroupPic(String groupPic) {
        this.groupPic = groupPic;
    }

    public Set<User> getUsers() {
        return this.users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<User> getJoinRequests() {
        return this.joinRequests;
    }

    public void setJoinRequests(Set<User> joinRequests) {
        this.joinRequests = joinRequests;
    }

}