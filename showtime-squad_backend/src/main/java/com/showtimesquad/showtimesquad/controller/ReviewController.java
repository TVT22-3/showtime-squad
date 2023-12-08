package com.showtimesquad.showtimesquad.controller;

import com.showtimesquad.showtimesquad.model.request.MovieReviewsRequest;
import com.showtimesquad.showtimesquad.model.response.MovieReviewsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final List<MovieReviewsResponse> movieReviewsList = new ArrayList<>();

    @PostMapping
    public ResponseEntity<MovieReviewsResponse> createReview(@RequestBody MovieReviewsRequest movieReviewsRequest) {
        // Validate the request if necessary
        if (movieReviewsRequest.getReviewStars() == null || movieReviewsRequest.getUserId() == null || movieReviewsRequest.getMovieApi() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Your logic to save the review or perform other actions
        MovieReviewsResponse movieReviewsResponse = createMovieReview(movieReviewsRequest);
        movieReviewsList.add(movieReviewsResponse);
        return new ResponseEntity<>(movieReviewsResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieReviewsResponse> getReview(@PathVariable Long id) {
        // Your logic to retrieve the review based on the ID
        MovieReviewsResponse movieReviewsResponse = findMovieReviewById(id);
        if (movieReviewsResponse != null) {
            return new ResponseEntity<>(movieReviewsResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Helper method to simulate creating a movie review
    private MovieReviewsResponse createMovieReview(MovieReviewsRequest movieReviewsRequest) {
        // Your logic to map MovieReviewsRequest to MovieReviewsResponse
        // For demonstration purposes, let's create a response with the same data
        return new MovieReviewsResponse(
                // Assuming you have a service or repository to handle database operations
                // Use the appropriate logic to generate an ID
                movieReviewsList.size() + 1L,
                movieReviewsRequest.getUserId(),
                movieReviewsRequest.getMovieApi(),
                movieReviewsRequest.getReviewStars(),
                movieReviewsRequest.getReviewText()
        );
    }

    // Helper method to simulate finding a movie review by ID
    private MovieReviewsResponse findMovieReviewById(Long id) {
        // Your logic to retrieve the movie review from the database
        // For demonstration purposes, let's find it from the list
        return movieReviewsList.stream()
                .filter(review -> review.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
