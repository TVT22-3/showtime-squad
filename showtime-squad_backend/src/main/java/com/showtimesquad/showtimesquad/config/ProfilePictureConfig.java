package com.showtimesquad.showtimesquad.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ProfilePictureConfig {

    @Value("#{'${PROFILE_PICTURES}'.split(',')}")
    private List<String> profilePictures;

    public String getRandomProfilePicture() {
        int randomIndex = (int) (Math.random() * profilePictures.size());
        return profilePictures.get(randomIndex);
    }
}
