package com.showtimesquad.showtimesquad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.showtimesquad.showtimesquad.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods if needed
}

