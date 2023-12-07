package com.showtimesquad.showtimesquad.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.showtimesquad.showtimesquad.repository.GroupRepository;

// TODO: I don't if we should move to using service or not
@Service
public class GroupService {

    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public List<String> getAllGroupNames() {
        return groupRepository.findAllGroupNames();
    }
}
