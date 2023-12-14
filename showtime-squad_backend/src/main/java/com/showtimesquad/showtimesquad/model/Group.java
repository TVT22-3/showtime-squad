package com.showtimesquad.showtimesquad.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Size(max = 128)
    @Column(name = "group_description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "news", columnDefinition = "integer[]")
    private List<Integer> news;

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

    public Group(String groupname, String description, User owner) {
        this.groupname = groupname;
        this.description = description;
        this.owner = owner;
        users.add(owner);
    }

    /**
     * Removes all news with the specified {@code id} (as in the value, not its own
     * id)
     * 
     * @param newsIdToRemove
     * @throws IllegalArgumentException when id is null or news don't exist
     */
    public void removeNews(Integer newsIdToRemove) throws IllegalArgumentException {
        if (newsIdToRemove == null || this.news == null)
            throw new IllegalArgumentException();

        for (int i = 0; i < this.news.size(); i++) {
            Integer item = this.news.get(i);
            if (item != null && item.equals(newsIdToRemove)) {
                this.news.remove(newsIdToRemove);
            }
        }
    }

    /**
     * Removes one news at specified index
     * 
     * @param indexToRemove
     * @throws IndexOutOfBoundsException when news index or news does not exist
     */
    public void removeNewsAtIndex(Integer indexToRemove) throws IndexOutOfBoundsException {
        if (indexToRemove < 0 || this.news == null || indexToRemove >= this.news.size()) {
            throw new IndexOutOfBoundsException();
        }

        this.news.remove(this.news.get(indexToRemove));
    }

    /**
     * Adds news up to an array size of 10, after which it will start removing the
     * oldest one when adding
     * 
     * @param newsToAdd
     */
    public void addNews(Integer newsToAdd) {
        if (this.news == null) {
            // create new list
            this.news = new ArrayList<>();
        }

        if (this.news.size() >= 10) {
            // remove oldest
            dequeueNews();
        }

        this.news.add(newsToAdd);
    }

    /**
     * Removes and returns the oldest news
     * 
     * @return {@code null} when nothing was removed
     */
    public Integer dequeueNews() {
        if (this.news != null && !news.isEmpty()) {
            return news.remove(0);
        }
        return null;
    }

    // getters and setters

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Integer> getNews() {
        return this.news;
    }

    public void setNews(List<Integer> news) {
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