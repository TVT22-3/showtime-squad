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

    /**
     * Finds a UserList by its list name.
     *
     * @param listName the name of the list
     * @return an Optional containing the UserList if found, otherwise empty
     */
    Optional<UserList> findByListName(String listName);

    /**
     * Finds a UserList by its group name.
     *
     * @param groupname the name of the group
     * @return an Optional containing the UserList if found, otherwise empty
     */
    @Query("SELECT u FROM UserList u WHERE u.groupname = ?1")
    Optional<UserList> findByGroup(Group groupname);

    @Query("SELECT l FROM UserList l WHERE l.username = ?1")
    Optional<UserList> findByUser(User username);
}