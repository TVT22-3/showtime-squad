package com.showtimesquad.showtimesquad.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.showtimesquad.showtimesquad.repository.GroupRepository;

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
