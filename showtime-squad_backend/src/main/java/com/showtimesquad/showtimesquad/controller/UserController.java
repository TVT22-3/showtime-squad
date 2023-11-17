package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository usersRepository;

    // Endpoint to add a user
    @PostMapping
    public User addUser(@RequestBody User user) {
        return usersRepository.save(user);
    }

    // Endpoint to get user data by ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return usersRepository.findById(id).orElse(null);
    }
}
