package com.showtimesquad.showtimesquad.service;

import com.showtimesquad.showtimesquad.enums.ERole;
import com.showtimesquad.showtimesquad.model.Role;
import com.showtimesquad.showtimesquad.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Service
public class RoleInitializationService {

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void initRoles() {
        // Check if roles already exist in the database
        if (roleRepository.count() == 0) {
            // Roles don't exist, insert them
            Arrays.stream(ERole.values())
                    .map(Role::new)
                    .forEach(roleRepository::save);
        }
    }
}
