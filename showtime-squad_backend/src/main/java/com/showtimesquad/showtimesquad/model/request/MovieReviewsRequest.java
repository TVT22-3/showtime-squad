package com.showtimesquad.showtimesquad.model.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class MovieReviewsRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Integer movieApi;

    @Positive
    private Integer reviewStars;

    private String reviewText;

    public MovieReviewsRequest() {
    }

    public MovieReviewsRequest(Long userId, Integer movieApi, Integer reviewStars, String reviewText) {
        this.userId = userId;
        this.movieApi = movieApi;
        this.reviewStars = reviewStars;
        this.reviewText = reviewText;
    }

    // Getters and setters
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