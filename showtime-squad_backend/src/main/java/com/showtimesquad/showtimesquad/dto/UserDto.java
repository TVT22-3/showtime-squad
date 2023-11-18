package com.showtimesquad.showtimesquad.dto;
import java.util.Objects;

public class UserDto {

    private String username;
    private String password;

    public UserDto() {
    }

    public UserDto(String username, String rawPassword) {
        this.username = username;
        this.password = rawPassword;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String rawPassword) {
        this.password = rawPassword;
    }

    public UserDto username(String username) {
        setUsername(username);
        return this;
    }

    public UserDto rawPassword(String rawPassword) {
        setPassword(rawPassword);
        return this;
    }

}
