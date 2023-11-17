package com.showtimesquad.showtimesquad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.showtimesquad.showtimesquad.model.Users;
import com.showtimesquad.showtimesquad.repository.UsersRepository;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    // Endpoint to add a user
    @PostMapping
    public Users addUser(@RequestBody Users user) {
        return usersRepository.save(user);
    }

    // Endpoint to get user data by ID
    @GetMapping("/{id}")
    public Users getUser(@PathVariable Long id) {
        return usersRepository.findById(id).orElse(null);
    }
}
