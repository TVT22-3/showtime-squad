package com.showtimesquad.showtimesquad.model.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
	@NotBlank
	private String username;

	@NotBlank
	private String password;

	public LoginRequest() {
	}

	@JsonCreator
	public LoginRequest(
			@JsonProperty("username") String username,
			@JsonProperty("password") String password) {
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
