package com.showtimesquad.showtimesquad.repository;

import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.model.UserList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * This interface represents a repository for managing UserList entities.
 * It extends the JpaRepository interface, providing CRUD operations for
 * UserList entities.
 */
@Repository
public interface ListRepository extends JpaRepository<UserList, Long> {

    Boolean existsByListName(String listName);

    Optional<UserList> findByListName(String listName);

    @Query("SELECT l FROM UserList l WHERE l.username = ?1")
    List<UserList> findByUser(User user);

    @Query("SELECT l FROM UserList l WHERE l.groupname = ?1")
    List<UserList> findByGroup(Group group);
}