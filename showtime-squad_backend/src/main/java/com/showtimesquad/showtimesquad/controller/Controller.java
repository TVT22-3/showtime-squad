package com.showtimesquad.showtimesquad.controller;

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

    @GetMapping(value = "/movies")
    private static String getMovies(){
        final String uri = "https://api.themoviedb.org/3/movie/157336?api_key=201a468fc5076c340fc6f57c9440fe90";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        return result;
    }
}
