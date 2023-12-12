package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * Represents a request object for creating a user list.
 */
public class UserListRequest {

    @NotBlank
    @Size(max = 45)
    private String listName;

    private Long userId;

    private String groupname;

    private List<Integer> movieIds;

    /**
     * Default constructor for UserListRequest.
     */
    public UserListRequest() {
    }

    /**
     * Constructor for UserListRequest with parameters.
     *
     * @param listName  the name of the list
     * @param userId    the ID of the user
     * @param groupname the name of the group
     * @param movieIds  the list of movie IDs
     */
    public UserListRequest(String listName, Long userId, String groupname, List<Integer> movieIds) {
        this.listName = listName;
        this.userId = userId;
        this.groupname = groupname;
        this.movieIds = movieIds;
    }

    /**
     * Adds a movie ID to the list of movie IDs.
     *
     * @param movieId the ID of the movie to add
     */
    public void addMovieId(Integer movieId) {
        this.movieIds.add(movieId);
    }

    /**
     * Removes a movie ID from the list of movie IDs.
     *
     * @param movieId the ID of the movie to remove
     */
    public void removeMovieId(Integer movieId) {
        this.movieIds.remove(movieId);
    }

    /**
     * Returns the name of the list.
     *
     * @return the name of the list
     */
    public String getListName() {
        return listName;
    }

    /**
     * Sets the name of the list.
     *
     * @param listName the name of the list
     */
    public void setListName(String listName) {
        this.listName = listName;
    }

    /**
     * Returns the ID of the user.
     *
     * @return the ID of the user
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * Sets the ID of the user.
     *
     * @param userId the ID of the user
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * Returns the name of the group.
     *
     * @return the name of the group
     */
    public String getGroupName() {
        return groupname;
    }

    /**
     * Sets the name of the group.
     *
     * @param groupName the name of the group
     */
    public void setGroupName(String groupName) {
        this.groupname = groupName;
    }

    /**
     * Returns the list of movie IDs.
     *
     * @return the list of movie IDs
     */
    public List<Integer> getMovieIds() {
        return movieIds;
    }

    /**
     * Sets the list of movie IDs.
     *
     * @param movieIds the list of movie IDs
     */
    public void setMovieIds(List<Integer> movieIds) {
        this.movieIds = movieIds;
    }
}