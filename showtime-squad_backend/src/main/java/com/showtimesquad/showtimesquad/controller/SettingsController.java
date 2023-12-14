package com.showtimesquad.showtimesquad.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.model.request.LoginRequest;
import com.showtimesquad.showtimesquad.model.response.MessageResponse;
import com.showtimesquad.showtimesquad.repository.GroupRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({ "/api/settings", "/settings" })
public class SettingsController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupRepository groupRepository;

    // TODO: admins should be able to delete almost anybody
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteUser(
            @PathVariable String username,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null || !userDetails.getUsername().equals(username)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Unauthorized action!"));
        }

        User user = userRepository.findByUsername(username).get();

        // delete all groups that the user owns
        List<Group> groups = groupRepository.findByOwnerName(username);
        if (groups != null && !groups.isEmpty()) {
            for (Group group : groups) {
                groupRepository.delete(group);
            }
        }

        // remove the user from any groups
        user.getGroups().forEach(group -> group.getUsers().remove(user));
        user.getJoinRequests().forEach(group -> group.getJoinRequests().remove(user));

        // delete user
        userRepository.delete(user);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MessageResponse("Account '%s' deleted".formatted(username)));
    }
}
