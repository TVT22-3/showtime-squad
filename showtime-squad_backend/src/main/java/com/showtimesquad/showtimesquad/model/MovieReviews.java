package com.showtimesquad.showtimesquad.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "movie_reviews",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"id", "users_id", "movies_api_id"})
        })

public class MovieReviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
}

public void setId(Long id) {
        this.id = id;
}

@ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    public User getUser() {
        return user;
}

public void setUser(User user) {
        this.user = user;
}

@Column(name = "movies_api_id", nullable = false)
    private Integer movieApi;

    public Integer getMovieApi() {
        return movieApi;
}

public void setMovieApi(Integer movieApi) {
        this.movieApi = movieApi;
}

@Column(name = "review_stars")
    private Integer reviewStars;

    public Integer getReviewStars() {
        return reviewStars;
}

public void setReviewStars(Integer reviewStars) {
        this.reviewStars = reviewStars;
}

@Column(name = "review_text", columnDefinition = "TEXT")
    private String reviewText;

public String getReviewText() {
        return reviewText;
}

public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
}
}


