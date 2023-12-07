package com.showtimesquad.showtimesquad.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.showtimesquad.showtimesquad.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
  Optional<Group> findByGroupname(String groupname);

  Boolean existsByGroupname(String groupName);

  @Query("SELECT g.groupname FROM Group g")
  List<String> findAllGroupNames();
}