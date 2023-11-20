package com.showtimesquad.showtimesquad.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.showtimesquad.showtimesquad.enums.ERole;
import com.showtimesquad.showtimesquad.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
