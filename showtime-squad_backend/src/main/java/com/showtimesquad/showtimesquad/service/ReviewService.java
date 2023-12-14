package com.showtimesquad.showtimesquad.service;

import com.showtimesquad.showtimesquad.model.MovieReviews;
import com.showtimesquad.showtimesquad.repository.ReviewRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ReviewService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(UserRepository userRepository, ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<MovieReviews> getUserReviews(String username) {
        return reviewRepository.findByUserUsername(username);
    }
}
