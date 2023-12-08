package com.showtimesquad.showtimesquad.model.response;

public class MovieReviewsResponse {
    private Long id;
    private Long userId;
    private Integer movieApi;
    private Integer reviewStars;
    private String reviewText;

    public MovieReviewsResponse() {
    }

    public MovieReviewsResponse(Long id, Long userId, Integer movieApi, Integer reviewStars, String reviewText) {
        this.id = id;
        this.userId = userId;
        this.movieApi = movieApi;
        this.reviewStars = reviewStars;
        this.reviewText = reviewText;
    }

    // Getters and setters
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
