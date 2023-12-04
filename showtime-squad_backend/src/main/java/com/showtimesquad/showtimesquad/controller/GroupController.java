package com.showtimesquad.showtimesquad.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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
import com.showtimesquad.showtimesquad.model.request.GroupNewsRequest;
import com.showtimesquad.showtimesquad.model.response.GroupInfoResponse;
import com.showtimesquad.showtimesquad.model.response.MessageResponse;
import com.showtimesquad.showtimesquad.repository.GroupRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;
import com.showtimesquad.showtimesquad.util.ParseHelper;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({ "/api/group", "/group" })
public class GroupController {

        @Autowired
        UserRepository userRepository;

        @Autowired
        GroupRepository groupRepository;

        private enum AccessLevel {
                OWNER,
                MEMBER,
                JOINER,
                OUTSIDER,
                GUEST,
                UNAUTHORIZED,
        }

        private boolean userAndGroupNameIsValid(String username, String groupname) {
                if (username == null || groupname == null) {
                        // bad info
                        return false;
                }

                if (!userRepository.findByUsername(username).isPresent()) {
                        // no user
                        return false;
                }

                if (!groupRepository.findByGroupname(groupname).isPresent()) {
                        // no group
                        return false;
                }

                return true;
        }

        private AccessLevel checkAccess(
                        Map<String, String> requestBody,
                        UserDetails userDetails) {

                String username = requestBody.get("username");
                String groupname = requestBody.get("groupname");

                if (userDetails == null || !userDetails.getUsername().equals(username)) {
                        return AccessLevel.UNAUTHORIZED;
                }

                Group group = groupRepository.findByGroupname(groupname).get();
                User user = userRepository.findByUsername(username).get();

                if (group.getOwner().equals(user)) {
                        return AccessLevel.OWNER;
                }

                if (group.getUsers().contains(user)) {
                        return AccessLevel.MEMBER;
                }

                if (group.getJoinRequests().contains(user)) {
                        return AccessLevel.JOINER;
                }

                return AccessLevel.OUTSIDER;
        }

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

                group.getJoinRequests().add(user);
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("User '%s' requested to join group '%s'"
                                                .formatted(username, groupname)));
        }

        @PostMapping("/requests")
        public ResponseEntity<?> getJoinRequests(
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

                if (!group.getOwner().equals(user)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Not owner of the group"));
                }

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new GroupInfoResponse(groupOptional.get(), true));
        }

        @PostMapping("/accept")
        public ResponseEntity<?> acceptJoinRequests(
                        @RequestBody Map<String, String> requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                String username = requestBody.get("username");
                String groupname = requestBody.get("groupname");
                String joinername = requestBody.get("joiner");

                if (username == null || groupname == null || joinername == null) {
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

                Optional<User> joinerOptional = userRepository.findByUsername(joinername);
                if (!joinerOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("User does not exists"));
                }

                Group group = groupOptional.get();
                User user = userRepository.findByUsername(username).get();
                User joiner = joinerOptional.get();

                if (!group.getOwner().equals(user)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Not owner of the group"));
                }

                group.getUsers().add(joiner);
                group.getJoinRequests().remove(joiner);
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("User '%s' accepted to group '%s'"
                                                .formatted(joinername, groupname)));
        }

        @PostMapping("/remove")
        public ResponseEntity<?> removeUser(
                        @RequestBody Map<String, String> requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                String username = requestBody.get("username");
                String groupname = requestBody.get("groupname");
                String removename = requestBody.get("remove");

                if (username == null || groupname == null || removename == null) {
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

                Optional<User> removeOptional = userRepository.findByUsername(removename);
                if (!removeOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("User does not exists"));
                }

                Group group = groupOptional.get();
                User user = userRepository.findByUsername(username).get();
                User remove = removeOptional.get();

                if (!user.equals(remove) && !group.getOwner().equals(user)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Only owner can remove other users"));
                }

                if (group.getOwner().equals(remove)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Can not remove owner, use /delete instead"));
                }

                group.getUsers().remove(remove);
                group.getJoinRequests().remove(remove);
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("User '%s' has left group '%s'"
                                                .formatted(removename, groupname)));
        }

        @PostMapping("/news/add")
        public ResponseEntity<?> addGroupNews(
                        @RequestBody Map<String, String> requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                String username = requestBody.get("username");
                String groupname = requestBody.get("groupname");
                String news = requestBody.get("news");

                if (username == null || groupname == null || news == null || !ParseHelper.isNumeric(news)) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                        .body(new MessageResponse("Bad request body"));
                }

                Optional<User> userOptional = userRepository.findByUsername(username);
                if (userDetails == null || !userDetails.getUsername().equals(username) || !userOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Bad credentials"));
                }

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("Group does not exists"));
                }

                Group group = groupOptional.get();
                User user = userOptional.get();

                if (!group.getUsers().contains(user)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Only members can access this group"));
                }

                // TODO check parse int
                group.addNews(Integer.parseInt(news));
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("Successfully added news id '%s'"
                                                .formatted(news)));
        }

        @PostMapping("/news/remove-id")
        public ResponseEntity<?> removeGroupNewsById(
                        @Valid @RequestBody GroupNewsRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                String username = requestBody.getUsername();
                String groupname = requestBody.getGroupname();
                Integer newsId = requestBody.getNews();

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

                // TODO check parse int
                group.removeNews(newsId);
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("Successfully removed all news with id '%s'"
                                                .formatted(newsId)));
        }

        @PostMapping("/news/remove-index")
        public ResponseEntity<?> removeGroupNewsByIndex(
                        @RequestBody Map<String, String> requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                String username = requestBody.get("username");
                String groupname = requestBody.get("groupname");
                String newsIndex = requestBody.get("index");

                if (username == null || groupname == null || newsIndex == null || !ParseHelper.isNumeric(newsIndex)) {
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

                // TODO check parse int
                group.removeNewsAtIndex(Integer.parseInt(newsIndex));
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("Successfully removed news at index '%s'"
                                                .formatted(newsIndex)));
        }

}
