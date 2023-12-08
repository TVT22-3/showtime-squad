package com.showtimesquad.showtimesquad.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.Constraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "movies", uniqueConstraints = @UniqueConstraint(columnNames = "movieIds"))
public class Movies {

    @Id
    @Column(name = "movie_Id")
    private Integer movieId;
}