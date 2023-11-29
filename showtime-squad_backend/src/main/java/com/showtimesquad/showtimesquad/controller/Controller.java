package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class Controller {
    @RequestMapping("/")
    public String welcome() {
        return "Welcome!";
    }

    @RequestMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }

    @Value("${TMDB_API_KEY}")
    private String apiKey;

    @GetMapping(value = "/movies", produces = MediaType.APPLICATION_JSON_VALUE)
    private String getMovies(@RequestParam(defaultValue = "1") int page) {
        final String uri = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=" + page + "&region=US" + "&api_key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(uri, String.class);
    }
}
