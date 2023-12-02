package com.showtimesquad.showtimesquad.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.model.response.GroupInfoResponse;
import com.showtimesquad.showtimesquad.model.response.MessageResponse;
import com.showtimesquad.showtimesquad.repository.GroupRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({ "/api/group", "/group" })
public class GroupController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupRepository groupRepository;

    @PostMapping("/test")
    public ResponseEntity<?> testPost(
            @RequestBody Map<String, String> requestBody,
            @AuthenticationPrincipal UserDetails userDetails) {

        String username = requestBody.get("username");

        if (username != null && userDetails != null && userDetails.getUsername().equals(username)) {
            // Authenticated user
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new MessageResponse(
                            "Post to groups succeeded + authenticated"));
        } else {
            // Unauthenticated user
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new MessageResponse("Post to groups succeeded"));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createGroup(
            @RequestBody Map<String, String> requestBody,
            @AuthenticationPrincipal UserDetails userDetails) {

        String username = requestBody.get("username");
        String groupname = requestBody.get("groupname");

        if (username == null || groupname == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Bad request body"));
        }

        if (userDetails == null || !userDetails.getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse(
                            "Bad credentials"));
        }

        if (groupRepository.existsByGroupname(groupname)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MessageResponse("Group already exists"));
        }

        // can create group

        // get user
        Optional<User> userOptional = userRepository.findByUsername(username);

        // create new group
        Group group = new Group(groupname, userOptional.get());
        groupRepository.save(group);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new MessageResponse("Group '%s' created"
                        .formatted(groupname)));
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinGroup(
            @RequestBody Map<String, String> requestBody,
            @AuthenticationPrincipal UserDetails userDetails) {

        String username = requestBody.get("username");
        String groupname = requestBody.get("groupname");

        if (username == null || groupname == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Bad request body"));
        }

        if (userDetails == null || !userDetails.getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Bad credentials"));
        }

        Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
        if (!groupOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Group does not exists"));
        }

        Group group = groupOptional.get();
        User user = userRepository.findByUsername(username).get();

        group.getUsers().add(user);
        groupRepository.save(group);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new MessageResponse("User '%s' joined group '%s' (TODO)"
                        .formatted(username, groupname)));
    }

    @GetMapping("/{groupname}")
    public ResponseEntity<?> getGroup(
            @PathVariable String groupname,
            @AuthenticationPrincipal UserDetails userDetails) {

        Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
        if (!groupOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("No group with that name"));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GroupInfoResponse(groupOptional.get()));
    }

}
