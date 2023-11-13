package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
public class Controller {
    @RequestMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }

    @Value("${TMDB_API_KEY}")
    private String apiKey;
    @GetMapping(value = "/movies")
    private String getMovies(){
        final String uri = "https://api.themoviedb.org/3/movie/157435?api_key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        return result;
    }
}
