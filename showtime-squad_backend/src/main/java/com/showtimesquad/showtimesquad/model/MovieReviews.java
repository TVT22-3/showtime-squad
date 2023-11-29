package com.showtimesquad.showtimesquad.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movie_reviews",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"id", "users_id", "movies_api_id"})
        })

public class MovieReviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "movies_api_id", nullable = false)
    private MovieApi movieApi;

    @Column(name = "review_stars")
    private Integer reviewStars;

    @Column(name = "review_text", columnDefinition = "TEXT")
    private String reviewText;

}
