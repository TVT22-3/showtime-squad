package com.showtimesquad.showtimesquad.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.model.response.MessageResponse;
import com.showtimesquad.showtimesquad.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({ "/api/settings", "/settings" })
public class SettingsController {

    @Autowired
    UserRepository userRepository;

    // TODO: admins should be able to delete almost anybody
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteUser(
            @PathVariable String username,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails != null && userDetails.getUsername().equals(username)) {
            // Authenticated user, can delete itself
            Optional<User> user = userRepository.findByUsername(username);
            userRepository.delete(user.get());

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MessageResponse("Account '%s' deleted".formatted(username)));
        } else {
            // Unauthenticated user
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Unauthorized action!"));
        }
    }
}
