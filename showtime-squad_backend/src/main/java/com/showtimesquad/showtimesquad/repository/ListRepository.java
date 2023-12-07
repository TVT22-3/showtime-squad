package com.showtimesquad.showtimesquad.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.showtimesquad.showtimesquad.model.UserList;

@Repository
public interface ListRepository extends JpaRepository<List, Long> {
    Optional<UserList> findByListname(String listname);

    Boolean existsByListname(String listName);

    @Query("SELECT l.listname FROM List l")
    List<String> findAllListNames();
}