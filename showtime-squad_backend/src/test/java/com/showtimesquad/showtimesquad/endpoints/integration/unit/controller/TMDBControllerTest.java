package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller;

/**********************************************************
 * needs api key in test/resources/application.properties *
 **********************************************************/

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.net.URI;
import java.util.Arrays;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import com.showtimesquad.showtimesquad.controller.TMDBController;

class TMDBControllerTest {

    private TMDBController tmdbController;
    private RestTemplate restTemplate;

    @BeforeEach
    void setUp() {
        restTemplate = mock(RestTemplate.class);
        tmdbController = new TMDBController(restTemplate);
    }

    @Test
    void testGetAllMovies() {
        // Arrange
        List<Object> movies = Arrays.asList(new Object(), new Object());
        ResponseEntity<Object> expectedResponse = new ResponseEntity<>(movies, HttpStatus.OK);
        when(restTemplate.getForEntity(any(String.class), any())).thenReturn(expectedResponse);

        // Act
        ResponseEntity<List<Object>> response = tmdbController.getAllMovies();

        // Assert
        // Add your assertions here
    }

    @Test
    void testSearchMovies() {
        // Arrange
        String searchQuery = "Armaggedon";
        List<Object> movies = Arrays.asList(new Object(), new Object());
        ResponseEntity<List<Object>> expectedResponse = new ResponseEntity<>(movies, HttpStatus.OK);
        when(restTemplate.exchange(any(URI.class), eq(HttpMethod.GET), any(HttpEntity.class),
                eq(new ParameterizedTypeReference<List<Object>>() {
                })))
                .thenReturn(expectedResponse);
    }

    // Add tests for other methods
}
