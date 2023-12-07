package com.showtimesquad.showtimesquad.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user_lists")
public class UserList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 45)
    @Column(name = "list_name", nullable = false)
    private String listName;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_name", nullable = true)
    private Group group;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "lists_movies", joinColumns = @JoinColumn(name = "lists_id"), inverseJoinColumns = @JoinColumn(name = "movie_ids"))
    private Set<Movies> movies = new HashSet<>();

    public UserList() {
    }

    public UserList(String listName, User user) {
        this.listName = listName;
        this.user = user;
    }

}