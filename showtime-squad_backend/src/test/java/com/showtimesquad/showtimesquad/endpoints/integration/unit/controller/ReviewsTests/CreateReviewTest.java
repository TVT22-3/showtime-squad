package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller.ReviewsTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.showtimesquad.showtimesquad.model.MovieReviews;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.model.request.MovieReviewsRequest;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CreateReviewTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewRepository reviewRepository;

    @MockBean
    private UserRepository userRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @WithMockUser(username = "username")
    public void createReview_ReturnsCreatedStatus() throws Exception {
        // Mocking user existence
        when(userRepository.findByUsername(any())).thenReturn(Optional.of(new User()));

        // Mocking review creation
        when(reviewRepository.save(any())).thenReturn(new MovieReviews());

        // Prepare request data
        MovieReviewsRequest request = new MovieReviewsRequest();
        request.setUserId(1L);
        request.setMovieApi(285);
        request.setReviewStars(4);
        request.setReviewText("Great movie!");

        // Perform the request
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/review/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn();

        // You can further assert the response content or other details if needed
    }
}
