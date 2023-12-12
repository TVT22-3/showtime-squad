package com.showtimesquad.showtimesquad.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.showtimesquad.showtimesquad.model.Group;
import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.model.UserList;
import com.showtimesquad.showtimesquad.repository.GroupRepository;
import com.showtimesquad.showtimesquad.repository.ListRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/lists")
public class ListController {

    @Autowired
    ListRepository listRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupRepository groupRepository;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.status(HttpStatus.OK)
        .body(listRepository.findAll());

    }

    @GetMapping("/{listname}")
    public ResponseEntity<?> getList(
            @PathVariable String listname,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("User not logged in");
        }
        
        Optional<UserList> listOptional = listRepository.findByListName(listname);
        if (!listOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("List not found");
        }
        
        UserList list = listOptional.get();
        User user = userRepository.findByUsername(userDetails.getUsername()).get();
        Group group = list.getGroup();

        if (!(list.getUser().equals(user)||group.getUsers().contains(user))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("User does not have access to this list");
        }

        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PostMa
}
