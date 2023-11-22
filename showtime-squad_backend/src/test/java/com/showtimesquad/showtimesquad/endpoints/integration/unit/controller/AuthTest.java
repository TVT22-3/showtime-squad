package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller;

import com.showtimesquad.showtimesquad.controller.AuthController;

import com.showtimesquad.showtimesquad.model.request.SignupRequest;
import com.showtimesquad.showtimesquad.repository.RoleRepository;
import com.showtimesquad.showtimesquad.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class AuthTest {
    UserRepository userRepository = mock(UserRepository.class);
    RoleRepository roleRepository = mock(RoleRepository.class);

    AuthController authController = new AuthController();


    @Test
    void creatingUserReturnsOK() throws Exception {
        SignupRequest signupRequest = new SignupRequest();
        ResultActions result = MockMvc.perform(post("/signup")
                .contentType("application.json")
                .content());
        result.andExpect(status().isOk());
    }
}
