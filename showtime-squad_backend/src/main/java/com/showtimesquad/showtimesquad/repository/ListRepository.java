package com.showtimesquad.showtimesquad.repository;

import com.showtimesquad.showtimesquad.model.UserList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * This interface represents a repository for managing UserList entities.
 * It extends the JpaRepository interface, providing CRUD operations for
 * UserList entities.
 */
@Repository
public interface ListRepository extends JpaRepository<UserList, Long> {

    /**
     * Finds a UserList by its list name.
     *
     * @param listName the name of the list
     * @return an Optional containing the UserList if found, otherwise empty
     */
    Optional<UserList> findByListName(String listName);

    /**
     * Finds a UserList by its user ID.
     *
     * @param userId the ID of the user
     * @return an Optional containing the UserList if found, otherwise empty
     */
    Optional<UserList> findByUserId(Long userId);

    /**
     * Finds a UserList by its group name.
     *
     * @param groupname the name of the group
     * @return an Optional containing the UserList if found, otherwise empty
     */
    @Query("SELECT u FROM UserList u WHERE u.groupname = ?1")
    Optional<UserList> findByGroupname(String groupname);
}