package com.showtimesquad.showtimesquad.controller;

import com.showtimesquad.showtimesquad.service.UserDetailsImpl;
import com.showtimesquad.showtimesquad.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({ "/api/users", "/profile", "/users" })
public class ProfileController {

    private final UserDetailsServiceImpl userDetailsService;
    @Autowired
    public ProfileController(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

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

    @GetMapping("/{username}/exists")
    public ResponseEntity<String> checkUserExists(@PathVariable String username) {
        try {
            userDetailsService.loadUserByUsername(username);
            return ResponseEntity.ok("User exists");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{username}/profilepicture")
    public ResponseEntity<String> getUserProfilePicture(@PathVariable String username) {
        String profilePicture = userDetailsService.getUserProfilePictureByUsername(username);

        if (profilePicture != null) {
            return ResponseEntity.ok(profilePicture);
        } else {
            // Handle the case where the user or profile picture is not found
            return ResponseEntity.notFound().build();
        }
    }
}
