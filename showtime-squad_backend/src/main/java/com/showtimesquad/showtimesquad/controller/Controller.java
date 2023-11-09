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
        return "Hello world";
    }

    @GetMapping(value = "/callClientHello")
    private String getHelloClient() {
        String uri = "http://localhost:8080/hello";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        return result;
    }

    @GetMapping(value = "/movies")
    public List<Object> getMovies() {
        String url = "";
        RestTemplate restTemplate = new RestTemplate();

        Object[] movies = restTemplate.getForObject(url, Object[].class);
        return Arrays.asList(movies);
    }
}
