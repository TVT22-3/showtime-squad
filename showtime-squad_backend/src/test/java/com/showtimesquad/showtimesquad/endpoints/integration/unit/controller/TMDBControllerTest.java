package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import com.showtimesquad.showtimesquad.controller.TMDBController;

public class TMDBControllerTest {

    @Value("${TMDB_API_KEY}")
    private String apiKey;

    @Value("${standard.GET.response}")
    private String standardGetResponse;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private TMDBController tmdbController; // Mocked TMDBController

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        tmdbController = new TMDBController(restTemplate);
    }

    @Test
    public void testGetMovies() {
        // Mock the response from the external API
        String mockResponse = "Armageddon";
        ResponseEntity<String> expectedResponse = new ResponseEntity<>(mockResponse, HttpStatus.OK);
        when(restTemplate.getForEntity("https://api.themoviedb.org/3/movie/95?api_key={apiKey}", String.class, apiKey))
                .thenReturn(expectedResponse);
        ResponseEntity<String> actualResponse = tmdbController.getMovieById("95");

        // Assert the response
        assertEquals(expectedResponse, actualResponse);
    }

    // Add more test methods for other endpoints

}