package com.showtimesquad.showtimesquad.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

// TODO: fix searchQuery structure
// TODO: test endpoints

/**
 * The TMDBController class handles the REST API endpoints related to TMDB (The
 * Movie Database).
 */
@RestController
public class TMDBController {

    @Value("${TMDB_API_KEY}")
    private String tmdbApiKey;
    
    private final RestTemplate restTemplate;

    public TMDBController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Retrieves all movies from TMDB.
     *
     * @return A ResponseEntity containing a list of movies.
     */
    @GetMapping(value = "/movies")
    public ResponseEntity<List<Object>> getAllMovies() {
        String uri = "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        Object[] movies = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(movies));
    }

    /**
     * Searches for movies on TMDB based on the provided search query.
     *
     * @param searchQuery The search query.
     * @return A ResponseEntity containing a list of movies matching the search
     *         query.
     */
    @GetMapping(value = "/search")
    public ResponseEntity<List<Object>> searchMovies(@RequestParam("searchQuery") String searchQuery) {
        String uri = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbApiKey + "&query=" + searchQuery;
        RestTemplate restTemplate = new RestTemplate();
        Object[] movies = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(movies));
    }

    /**
     * Retrieves popular movies from TMDB.
     *
     * @return A ResponseEntity containing a list of popular movies.
     */
    @GetMapping(value = "/movies/popular")
    public ResponseEntity<List<Object>> getPopularMovies() {
        String uri = "https://api.themoviedb.org/3/movie/popular?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        Object[] popular = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(popular));
    }

    /**
     * Retrieves now playing movies from TMDB.
     *
     * @return A ResponseEntity containing a list of now playing movies.
     */
    @GetMapping(value = "/movies/now_playing")
    public ResponseEntity<List<Object>> getNowPlayingMovies() {
        String uri = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        Object[] movies = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(movies));
    }

    /**
     * Retrieves upcoming movies from TMDB.
     *
     * @return A ResponseEntity containing a list of upcoming movies.
     */
    @GetMapping(value = "/movies/upcoming")
    public ResponseEntity<List<Object>> getUpcoming() {
        String uri = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        Object[] movies = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(movies));
    }

    /**
     * Retrieves movies of a specific genre from TMDB.
     *
     * @param genreId The ID of the genre.
     * @return A ResponseEntity containing a list of movies of the specified genre.
     */
    @GetMapping(value = "/movies/genre")
    public ResponseEntity<List<Object>> getGenre(@RequestParam("genreId") String genreId) {
        String uri = "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbApiKey + "&with_genres=" + genreId;
        RestTemplate restTemplate = new RestTemplate();
        Object[] movies = restTemplate.getForObject(uri, Object[].class);
        return ResponseEntity.ok(Arrays.asList(movies));
    }

}
