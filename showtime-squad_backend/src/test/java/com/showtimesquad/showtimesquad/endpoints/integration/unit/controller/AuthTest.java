package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.showtimesquad.showtimesquad.controller.AuthController;

import com.showtimesquad.showtimesquad.model.request.LoginRequest;
import com.showtimesquad.showtimesquad.model.request.SignupRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.HashSet;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class AuthTest {
    @Autowired
    private MockMvc mockMvc;
    @Test
    @WithMockUser
    void creatingUserReturnsOK() throws Exception {

        // Test Data
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername("testuser1");
        signupRequest.setEmail("testuser1@testuser1.com");
        signupRequest.setPassword("testuser1");
        signupRequest.setRole(new HashSet<>(Arrays.asList("mod", "user")));

        // Converting SignupRequest to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestSignUp = objectMapper.writeValueAsString(signupRequest);

        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("http://localhost/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestSignUp));
        result.andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void userShouldExist() throws Exception {

        // Test Data
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("testuser");

        // Converting SignupRequest to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestLogin = objectMapper.writeValueAsString(loginRequest);
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("http://localhost/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestLogin));
        result.andExpect(status().isOk());
    }
}
