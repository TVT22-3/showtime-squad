package com.showtimesquad.showtimesquad.testutil;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.showtimesquad.showtimesquad.model.request.LoginRequest;
import com.showtimesquad.showtimesquad.model.request.SignupRequest;

public class DatabaseActions {

    /**
     * This function registers a user into the database.
     * The function is called in different test cases where we need
     * to register a user temporarily before testing a certain function.
     * 
     * @author Santtu Niskanen
     * @param mockMvc
     * @return 
     * @throws Exception
     */
    public static ResultActions registerUser(MockMvc mockMvc) throws Exception {
        return registerUser(mockMvc, "testuser", "testuser");
    }

    /**
     * This function registers a user into the database.
     * The function is called in different test cases where we need
     * to register a user temporarily before testing a certain function.
     * 
     * @author Santtu Niskanen
     * @param mockMvc
     * @param username
     * @return 
     * @throws Exception
     */
    public static ResultActions registerUser(MockMvc mockMvc, String username, String password) throws Exception {
        // Test Data
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setUsername(username);
        signupRequest.setEmail("%s@%s.com".formatted(username, username));
        signupRequest.setPassword(password);
        signupRequest.setRole(new HashSet<>(Arrays.asList("user")));

        // Converting SignupRequest to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestSignUp = objectMapper.writeValueAsString(signupRequest);

        // Performs The Registration
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("http://localhost/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestSignUp));
        System.out.println(result);
        return result;
    }

    /**
     * @author Santtu Niskanen
     * @param mockMvc
     * @return
     * @throws Exception
     */
    public static ResultActions loginUser(MockMvc mockMvc) throws Exception {
        return loginUser(mockMvc, "testuser", "testuser");
    }

    /**
     * @author Santtu Niskanen
     * @param mockMvc
     * @return
     * @throws Exception
     */
    public static ResultActions loginUser(MockMvc mockMvc, String username, String password) throws Exception {
        // Login Test Data
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);

        // Converting LoginRequest to JSON
        ObjectMapper loginObjectMapper = new ObjectMapper();
        String jsonRequestLogin = loginObjectMapper.writeValueAsString(loginRequest);
        return mockMvc.perform(MockMvcRequestBuilders.post("http://localhost/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequestLogin));
    }
}
