package com.showtimesquad.showtimesquad.repository;

import com.showtimesquad.showtimesquad.model.MovieReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<MovieReviews, Long> {

}
