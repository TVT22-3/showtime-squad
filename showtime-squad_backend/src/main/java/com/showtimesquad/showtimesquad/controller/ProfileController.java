package com.showtimesquad.showtimesquad.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    @GetMapping("/{username}")
    public String getUserProfile(@PathVariable String username, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null && userDetails.getUsername().equals(username)) {
            // Authenticated user, return extra information like password
            return "Authenticated user profile for " + username + ": Extra information - password: "
                    + userDetails.getPassword();
        } else {
            // Unauthenticated user
            return "Unauthenticated user profile for " + username;
        }
    }
}
