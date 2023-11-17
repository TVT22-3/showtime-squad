package com.showtimesquad.showtimesquad.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.showtimesquad.showtimesquad.model.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
    // You can add custom query methods if needed
}

