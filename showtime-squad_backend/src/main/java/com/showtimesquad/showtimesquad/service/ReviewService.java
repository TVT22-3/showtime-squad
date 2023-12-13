package com.showtimesquad.showtimesquad.service;

import com.showtimesquad.showtimesquad.dto.MovieReviewResponseDTO;
import com.showtimesquad.showtimesquad.model.MovieReviews;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.repository.ReviewRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(UserRepository userRepository, ReviewRepository reviewRepository) {
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<MovieReviewResponseDTO> getLastThreeReviewsByUser(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<MovieReviews> movieReviewsList = reviewRepository.findTop3ByUserOrderByCreatedAtDesc(user);
            return movieReviewsList.stream()
                    .map(MovieReviewResponseDTO::new)
                    .collect(Collectors.toList());

        } else {
            throw new RuntimeException("User not found");
        }
    }
}
