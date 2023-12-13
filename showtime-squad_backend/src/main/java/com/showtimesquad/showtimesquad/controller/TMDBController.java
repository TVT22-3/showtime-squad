package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping({ "/movies", "/tv" })
public class TMDBController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${TMDB_API_KEY}")
    private String apiKey;

    @GetMapping("/")
    public ResponseEntity<String> getMovies(@RequestParam(defaultValue = "1") int page) {
        String url = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&page=" + page;
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
    public ResponseEntity<String> getPopularMovies(@RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/nowplaying")
    public ResponseEntity<String> getNowPlayingMovies(@RequestParam(defaultValue = "1") int page,
            @RequestParam("region") String region) {
        String uri = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&region=" + region + "&page="
                + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/upcoming")
    public ResponseEntity<String> getUpcoming(@RequestParam(defaultValue = "1") int page,
            @RequestParam("region") String region) {
        String uri = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + apiKey + "&region=" + region + "&page="
                + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/genre")
    public ResponseEntity<String> getGenre(@RequestParam("genreId") String genreId,
            @RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&with_genres=" + genreId
                + "&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/search")
    public ResponseEntity<String> searchMovies(@RequestParam("searchQuery") String searchQuery,
            @RequestParam(defaultValue = "1") int page) {
        // TODO: searchQuery parsing?
        String uri = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + searchQuery + "&page="
                + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/toprated")
    public ResponseEntity<String> getTopRated(@RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey + "&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/series/search")
    public ResponseEntity<String> searchTvSeries(@RequestParam("searchQuery") String searchQuery,
            @RequestParam(defaultValue = "1") int page) {
        // TODO: searchQuery parsing?
        String uri = "https://api.themoviedb.org/3/search/tv?api_key=" + apiKey + "&query=" + searchQuery + "&page="
                + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/series/airingtoday")
    public ResponseEntity<String> getAiringTodayTvShows(@RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/tv/airing_today?api_key=" + apiKey + "&page=" + page;
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/series/ontheair")
    public ResponseEntity<String> getOnTheAirTvShows(@RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/tv/on_the_air?api_key=" + apiKey + "&page=" + page;
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/series/popular")
    public ResponseEntity<String> getPopularTvShows(@RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/tv/popular?api_key=" + apiKey + "&page=" + page;
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

    @GetMapping(value = "/series/toprated")
    public ResponseEntity<String> getTopRatedTvShows(@RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/tv/top_rated?api_key=" + apiKey + "&page=" + page;
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

        @GetMapping(value = "/series/genre")
    public ResponseEntity<String> getTvGenres(@RequestParam("genreId") String genreId,
            @RequestParam(defaultValue = "1") int page) {
        String uri = "https://api.themoviedb.org/3/discover/tv?api_key=" + apiKey + "&with_genres=" + genreId
                + "&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
        return response;
    }

        @GetMapping("/series/")
    public ResponseEntity<String> getTvSeries(@RequestParam(defaultValue = "1") int page) {
        String url = "https://api.themoviedb.org/3/discover/tv?api_key=" + apiKey + "&page=" + page;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }
}
