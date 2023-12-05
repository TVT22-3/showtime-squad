package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/movies")
public class TMDBController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${TMDB_API_KEY}")
    private String apiKey;

    @GetMapping("/movies")
    public ResponseEntity<String> getMovies() {
        String url = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&page=1";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    // Add more GET request methods for other endpoints
    @GetMapping(value = "/id")
    public ResponseEntity<String> getMovieById(@RequestParam String id) {
        String url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }

    @GetMapping(value = "/popular")
    public ResponseEntity<String> getPopularMovies() {
        String uri = "https://api.themoviedb.org/3/movie/popular?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/now_playing")
    public ResponseEntity<String> getNowPlayingMovies() {
        String uri = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/upcoming")
    public ResponseEntity<String> getUpcoming() {
        String uri = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + tmdbApiKey;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/genre")
    public ResponseEntity<String> getGenre(@RequestParam("genreId") String genreId) {
        String uri = "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbApiKey + "&with_genres=" + genreId;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/search")
    public ResponseEntity<String> searchMovies(@RequestParam("searchQuery") String searchQuery) {
        // TODO: searchQuery parsing?
        String uri = "https://api.themoviedb.org/3/search/movie?api_key=" + tmdbApiKey + "&query=" + searchQuery;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }
}
