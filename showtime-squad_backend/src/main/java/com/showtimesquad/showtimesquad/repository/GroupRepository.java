package com.showtimesquad.showtimesquad.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
  Optional<User> findByGroupname(String groupname);

  Boolean existsByGroupname(String groupName);
}