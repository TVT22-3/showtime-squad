package com.showtimesquad.showtimesquad.model;

import com.showtimesquad.showtimesquad.enums.ERole;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    public Role() {

    }

    public Role(ERole name) {
        this.name = name;
    }

    // getters and setters

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ERole getName() {
        return this.name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
