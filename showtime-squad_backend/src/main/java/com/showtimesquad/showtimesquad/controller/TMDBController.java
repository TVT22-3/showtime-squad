package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/")
public class TMDBController {

    private final RestTemplate restTemplate;

    @Value("${TMDB_API_KEY}")
    private String apiKey;

    public TMDBController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/movies")
    public ResponseEntity<String> getMovies() {
        String url = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&page=1";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    // Add more GET request methods for other endpoints
    @GetMapping(value = "/movies/id")
    public ResponseEntity<String> getMovieById(@RequestParam String id) {
        String url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

}
