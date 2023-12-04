package com.showtimesquad.showtimesquad.model.request;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

import com.showtimesquad.showtimesquad.model.response.MessageResponse;

import jakarta.validation.constraints.NotBlank;

public class AuthenticatedUserRequest {
    @NotBlank
    private String username;

    public ResponseEntity<?> validateUserDetails(UserDetails userDetails) {
        if (userDetails == null || !userDetails.getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse(
                            "Bad credentials"));
        }

        return null;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
