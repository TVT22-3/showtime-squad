package com.showtimesquad.showtimesquad.controller;

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
import com.showtimesquad.showtimesquad.model.request.GroupCreateRequest;
import com.showtimesquad.showtimesquad.model.request.GroupNewsRequest;
import com.showtimesquad.showtimesquad.model.request.GroupOwnerOnUserRequest;
import com.showtimesquad.showtimesquad.model.request.GroupRequest;
import com.showtimesquad.showtimesquad.model.response.GroupInfoResponse;
import com.showtimesquad.showtimesquad.model.response.MessageResponse;
import com.showtimesquad.showtimesquad.repository.GroupRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({ "/api/group", "/group" })
public class GroupController {

        @Autowired
        UserRepository userRepository;

        @Autowired
        GroupRepository groupRepository;

        @GetMapping("/")
        public ResponseEntity<?> getAll() {
                return ResponseEntity.status(HttpStatus.OK)
                                .body(new GroupInfoResponse(groupRepository.findAllGroupInfo()));
        }

        @GetMapping("/{groupname}")
        public ResponseEntity<?> getGroup(
                        @PathVariable String groupname,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("No group with that name"));
                }

                Group group = groupOptional.get();
                User user = userRepository.findByUsername(userDetails.getUsername()).get();

                if (!group.getUsers().contains(user)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Only members can access this group"));
                }

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new GroupInfoResponse(groupOptional.get()));
        }

        @PostMapping("/create")
        public ResponseEntity<?> createGroup(
                        @Valid @RequestBody GroupCreateRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();
                String description = requestBody.getDescription();
                if(description == null) {
                        description = "";
                }

                if (groupRepository.existsByGroupname(groupname)) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                        .body(new MessageResponse("Group already exists"));
                }

                // get user
                Optional<User> userOptional = userRepository.findByUsername(username);

                // create new group
                Group group = new Group(groupname, description, userOptional.get());
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(new MessageResponse("Group '%s' created"
                                                .formatted(groupname)));
        }

        @PostMapping("/join")
        public ResponseEntity<?> joinGroup(
                        @Valid @RequestBody GroupRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("Group does not exists"));
                }

                Group group = groupOptional.get();
                User user = userRepository.findByUsername(username).get();

                if (group.getUsers().contains(user) || group.getJoinRequests().contains(user)) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                        .body(new MessageResponse("User already in group / attempting to join"));
                }

                group.getJoinRequests().add(user);
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("User '%s' requested to join group '%s'"
                                                .formatted(username, groupname)));
        }

        @PostMapping("/requests")
        public ResponseEntity<?> getJoinRequests(
                        @Valid @RequestBody GroupRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();

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
                        @Valid @RequestBody GroupOwnerOnUserRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();
                String joinername = requestBody.getAnother();

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
                        @Valid @RequestBody GroupOwnerOnUserRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();
                String removename = requestBody.getAnother();

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("Group does not exists"));
                }

                Optional<User> removeOptional = userRepository.findByUsername(removename);
                if (!removeOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("User does not exist"));
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
                                        .body(new MessageResponse(
                                                        "Can not remove owner, use DELETE to remove group instead"));
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
                        @Valid @RequestBody GroupNewsRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();
                Integer news = requestBody.getNews();

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("Group does not exists"));
                }

                Group group = groupOptional.get();
                if (!group.getUsers().contains(userRepository.findByUsername(username).get())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Only members can access this group"));
                }

                group.addNews(news);
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("Successfully added news id '%s'"
                                                .formatted(news)));
        }

        @PostMapping("/news/remove-id")
        public ResponseEntity<?> removeGroupNewsById(
                        @Valid @RequestBody GroupNewsRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();
                Integer newsId = requestBody.getNews();

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("Group does not exists"));
                }

                Group group = groupOptional.get();
                if (!group.getUsers().contains(userRepository.findByUsername(username).get())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Only members can access this group"));
                }

                try {
                        group.removeNews(newsId);
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                        .body(new MessageResponse("News for this group might not exist"
                                                        .formatted(newsId)));
                }

                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("Successfully removed all news with id '%s'"
                                                .formatted(newsId)));
        }

        @PostMapping("/news/remove-index")
        public ResponseEntity<?> removeGroupNewsByIndex(
                        @Valid @RequestBody GroupNewsRequest requestBody,
                        @AuthenticationPrincipal UserDetails userDetails) {

                if (userDetails == null) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Bad credentials"));
                }

                String username = userDetails.getUsername();
                String groupname = requestBody.getGroupname();
                Integer newsIndex = requestBody.getNews();

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("Group does not exists"));
                }

                Group group = groupOptional.get();
                if (!group.getUsers().contains(userRepository.findByUsername(username).get())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse(
                                                        "Only members can access this group"));
                }

                try {
                        group.removeNewsAtIndex(newsIndex);
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                        .body(new MessageResponse("Index '%s is invalid'"
                                                        .formatted(newsIndex)));
                }
                groupRepository.save(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("Successfully removed news at index '%s'"
                                                .formatted(newsIndex)));
        }

        @DeleteMapping("/{groupname}")
        public ResponseEntity<?> deleteGroup(
                        @NotBlank @PathVariable String groupname,
                        @AuthenticationPrincipal UserDetails userDetails) {

                Optional<Group> groupOptional = groupRepository.findByGroupname(groupname);
                if (!groupOptional.isPresent()) {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                        .body(new MessageResponse("Group does not exists"));
                }

                Group group = groupOptional.get();
                User user = userRepository.findByUsername(userDetails.getUsername()).get();

                if (!group.getOwner().equals(user)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body(new MessageResponse("Only owner can remove group"));
                }

                groupRepository.delete(group);

                return ResponseEntity.status(HttpStatus.OK)
                                .body(new MessageResponse("Successfully removed group '%s'"
                                                .formatted(groupname)));
        }

}
