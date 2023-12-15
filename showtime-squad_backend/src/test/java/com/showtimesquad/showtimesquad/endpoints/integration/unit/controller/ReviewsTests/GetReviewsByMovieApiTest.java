package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller.ReviewsTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.showtimesquad.showtimesquad.model.MovieReviews;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.repository.ReviewRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class GetReviewsByMovieApiTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewRepository reviewRepository;

    @MockBean
    private UserRepository userRepository;  // Mocking UserRepository

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getReviewsByMovieApi_ReturnsOkStatus() throws Exception {
        
        // Mock user
        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setUsername("username");

        // Mock UserRepository behavior
        when(userRepository.findById(anyLong())).thenReturn(Optional.of(mockUser));

        // Mock movieReviews
        MovieReviews mockReview = new MovieReviews();
        mockReview.setId(1L);
        mockReview.setMovieApi(285);
        mockReview.setUser(mockUser);
        mockReview.setReviewStars(4);
        mockReview.setReviewText("Great movie!");

        List<MovieReviews> reviewsList = Collections.singletonList(mockReview);
        when(reviewRepository.findByMovieApi(anyInt())).thenReturn(reviewsList);

        // Perform the request with the correct parameter name
        mockMvc.perform(MockMvcRequestBuilders.get("/api/review/")
                .param("movieId", "285"))  // Removed unnecessary "4" parameter
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].userId").value(1))
                .andExpect(jsonPath("$[0].movieApi").value(285))
                .andExpect(jsonPath("$[0].reviewStars").value(4))
                .andExpect(jsonPath("$[0].reviewText").value("Great movie!"))
                .andExpect(jsonPath("$[0].username").value("username"));
    }
}

