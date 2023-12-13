package com.showtimesquad.showtimesquad.dto;

import com.showtimesquad.showtimesquad.model.MovieReviews;

import java.time.LocalDateTime;

public class MovieReviewResponseDTO {
    private Long id;
    private String username; // Add any other fields you want to include
    private Integer movieApi;
    private Integer reviewStars;
    private String reviewText;
    private LocalDateTime createdAt;

    // Constructors, getters, and setters

    // Constructor to map from MovieReviews entity
    public MovieReviewResponseDTO(MovieReviews movieReviews) {
        this.id = movieReviews.getId();
        this.username = movieReviews.getUser().getUsername();
        this.movieApi = movieReviews.getMovieApi();
        this.reviewStars = movieReviews.getReviewStars();
        this.reviewText = movieReviews.getReviewText();
        this.createdAt = movieReviews.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Integer getMovieApi() {
        return movieApi;
    }

    public Integer getReviewStars() {
        return reviewStars;
    }

    public String getReviewText() {
        return reviewText;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}
