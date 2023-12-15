package com.showtimesquad.showtimesquad.model.response;

public class MovieReviewsResponse {
    private Long id;
    private Long userId;
    private Integer movieApi;
    private Integer reviewStars;
    private String reviewText;
    private String username;

   

    public MovieReviewsResponse() {
    }

    public MovieReviewsResponse(Long id, Long userId, Integer movieApi, Integer reviewStars, String reviewText, String username) {
        this.id = id;
        this.userId = userId;
        this.movieApi = movieApi;
        this.reviewStars = reviewStars;
        this.reviewText = reviewText;
        this.username = username;
    }

    // Getters and setters
     public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getMovieApi() {
        return movieApi;
    }

    public void setMovieApi(Integer movieApi) {
        this.movieApi = movieApi;
    }

    public Integer getReviewStars() {
        return reviewStars;
    }

    public void setReviewStars(Integer reviewStars) {
        this.reviewStars = reviewStars;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
