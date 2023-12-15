package com.showtimesquad.showtimesquad.repository;

import com.showtimesquad.showtimesquad.model.MovieReviews;
import com.showtimesquad.showtimesquad.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<MovieReviews, Long> {
    List<MovieReviews> findByMovieApi(Integer movieApi);
    List<MovieReviews> findByUserUsername(String username);
}



