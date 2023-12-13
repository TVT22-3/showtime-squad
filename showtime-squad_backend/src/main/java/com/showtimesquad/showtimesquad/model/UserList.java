package com.showtimesquad.showtimesquad.model;

/*
 * This file is used for the UserList model. It contains 
 * the UserList class, which represents a user generated
 * list of movies.
 */

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Represents a user list that contains a list of movies.
 */
@Entity
@Table(name = "user_lists")
public class UserList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 45)
    @Column(name = "list_name", nullable = false)
    private String listName;

    @ManyToOne
    @JoinColumn(name = "user_name", nullable = true)
    private User username;

    @ManyToOne
    @JoinColumn(name = "group_name", nullable = true)
    private Group groupname;

    @Column(name = "movie_ids", columnDefinition = "integer[]")
    private List<Integer> movieIds;

    /**
     * 
     * Constructor with list name and user.
     * /**
     * Constructor with list name and user.
     * 
     * @param listName The name of the list.
     * @param username The user associated with the list.
     */
    public UserList(String listName, User user) {
        this.listName = listName;
        this.username = user;
        this.movieIds = new ArrayList<>();
    }

    /**
     * Constructor with list name and group.
     * 
     * @param listName  The name of the list.
     * @param groupname The group associated with the list.
     */
    public UserList(String listName, Group groupname) {
        this.listName = listName;
        this.groupname = groupname;
        this.movieIds = new ArrayList<>();
    }

    /**
     * Constructor with list name, user, and group.
     * 
     * @param listName  The name of the list.
     * @param user      The user associated with the list.
     * @param groupname The group associated with the list.
     */
    public UserList(String listName, User user, Group groupname) {
        this.listName = listName;
        this.username = user;
        this.groupname = groupname;
        this.movieIds = new ArrayList<>();
    }

    /**
     * Renames the list.
     * 
     * @param listName The new name for the list.
     */
    public void renameList(String listName) {
        this.listName = listName;
    }

    /**
     * Returns the name of the list.
     * 
     * @return The name of the list.
     */
    public String getListName() {
        return this.listName;
    }

    /**
     * Adds a movie to the list.
     * 
     * @param movieId The ID of the movie to add.
     */
    public void addMovie(Integer movieId) {
        this.movieIds.add(movieId);
    }

    /**
     * Removes a movie from the list.
     * 
     * @param movieId The ID of the movie to remove.
     */
    public void removeMovie(Integer movieId) {
        this.movieIds.remove(movieId);
    }

    /**
     * Returns the list of movie IDs.
     * 
     * @return The list of movie IDs.
     */
    public List<Integer> getMovieIds() {
        return this.movieIds;
    }

    /**
     * Sets the list of movie IDs.
     * 
     * @param movieIds The list of movie IDs.
     */
    public void setMovieIds(List<Integer> movieIds) {
        this.movieIds = movieIds;
    }

    /**
     * Returns the group associated with the list.
     * 
     * @return groupname The name of the group associated with the list.
     */
    public Group getGroup() {
        return this.groupname;
    }

    public User getUser() {
        return this.username;
    }

}