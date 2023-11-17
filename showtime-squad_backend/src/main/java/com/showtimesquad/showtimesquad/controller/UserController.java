package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint to add a user
    @PostMapping
    public User addUser(@RequestBody User user) {
        user.setPassword(user.getPassword()); // Use the setPassword method to encrypt the password
        return userRepository.save(user);
    }

    // Endpoint to get user data by ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
