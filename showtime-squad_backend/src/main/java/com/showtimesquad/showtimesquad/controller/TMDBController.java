package com.showtimesquad.showtimesquad.controller;

import org.hibernate.mapping.Array;
import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.List;

@RestController
public class TMDBController {

    @Value("${TMDB_API_KEY}")
    private String tmdbApiKey;

    @GetMapping(value = "/movies")
    public ResponseEntity<List<Object>> getAllMovies() {
        String uri = "https://api.themoviedb.org/3/movie/157435?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        Object[] movies = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(movies));
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<Object>> searchMovies(@RequestParam("searchQuery") String searchQuery) {
        String uri = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbApiKey + "&query=" + searchQuery;
        RestTemplate restTemplate = new RestTemplate();
        Object[] movies = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(movies));
    }

    @GetMapping(value = "/movie")
}