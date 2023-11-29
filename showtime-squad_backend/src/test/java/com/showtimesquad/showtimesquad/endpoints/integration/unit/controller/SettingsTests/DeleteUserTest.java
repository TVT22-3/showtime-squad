package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller.SettingsTests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.transaction.TestTransaction;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import com.showtimesquad.showtimesquad.model.User;
import com.showtimesquad.showtimesquad.repository.UserRepository;
import com.showtimesquad.showtimesquad.testutil.DatabaseActions;
import com.showtimesquad.showtimesquad.testutil.Randomizers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class DeleteUserTest {

    private static final int USERNAME_MAX = 20;
    private static final int PASSWORD_MAX = 40;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    @WithMockUser
    @Transactional
    @Rollback
    void deletingUserReturnsOK() throws Exception {
        // generate random user info
        String username = Randomizers.randomString(USERNAME_MAX);
        String password = Randomizers.randomString(PASSWORD_MAX);

        // Test Data
        ResultActions result = DatabaseActions.registerUser(mockMvc, username, password)
                .andExpect(status().isOk());

        // TODO: no idea if I should place these here
        TestTransaction.flagForCommit();
        TestTransaction.end();

        Optional<User> user = userRepository.findByUsername(username);
        assertTrue(user.isPresent(), "User should be present in the database");

        // attempt to delete after sign-in
        ResultActions loginResult = DatabaseActions.loginUser(mockMvc, username, password);
        loginResult.andExpect(status().isOk());

        ResultActions realDelete = mockMvc.perform(MockMvcRequestBuilders
                .delete("http://localhost/api/settings/delete/%s".formatted(username))
                .contentType(MediaType.APPLICATION_JSON));
        realDelete.andExpect(status().isOk());

        user = userRepository.findByUsername(username);

        assertFalse(user.isPresent(), "User should not still exist!");
    }

    @Test
    @WithMockUser
    @Transactional
    @Rollback
    void deletingUserBeforeLoginReturnsForbidden() throws Exception {
        // generate random user info
        String username = Randomizers.randomString(USERNAME_MAX);
        String password = Randomizers.randomString(PASSWORD_MAX);

        // Test Data
        ResultActions result = DatabaseActions.registerUser(mockMvc, username, password)
                .andExpect(status().isOk());

        // TODO: no idea if I should place these here
        TestTransaction.flagForCommit();
        TestTransaction.end();

        Optional<User> user = userRepository.findByUsername(username);
        assertTrue(user.isPresent(), "User should be present in the database");

        // attempt to delete before sign-in
        ResultActions falseDelete = mockMvc.perform(MockMvcRequestBuilders
                .delete("http://localhost/api/settings/delete/%s".formatted(username))
                .contentType(MediaType.APPLICATION_JSON));
        falseDelete.andExpect(status().isForbidden());

        user = userRepository.findByUsername(username);
        assertTrue(user.isPresent(), "User should still exist!");

        userRepository.delete(user.get());
    }

    @Test
    @WithMockUser
    @Transactional
    @Rollback
    void deletingOtherUserReturnsForbidden() throws Exception {
        // generate random user info
        String username = Randomizers.randomString(USERNAME_MAX);
        String password = Randomizers.randomString(PASSWORD_MAX);
        String opposingUsername = Randomizers.randomString(USERNAME_MAX);
        String opposingPassword = Randomizers.randomString(PASSWORD_MAX);

        // Test Data
        ResultActions result = DatabaseActions.registerUser(mockMvc, username, password)
                .andExpect(status().isOk());
        ResultActions opposingResult = DatabaseActions.registerUser(mockMvc, opposingUsername, opposingPassword)
                .andExpect(status().isOk());

        // TODO: no idea if I should place these here
        TestTransaction.flagForCommit();
        TestTransaction.end();

        Optional<User> user = userRepository.findByUsername(username);
        assertTrue(user.isPresent(), "User should be present in the database");
        Optional<User> opposingUser = userRepository.findByUsername(opposingUsername);
        assertTrue(opposingUser.isPresent(), "User should be present in the database");

        // attempt to delete another account after sign-in
        ResultActions loginResult = DatabaseActions.loginUser(mockMvc, username, password);
        loginResult.andExpect(status().isOk());

        ResultActions maliciousDelete = mockMvc.perform(MockMvcRequestBuilders
                .delete("http://localhost/api/settings/delete/%s".formatted(opposingUsername))
                .contentType(MediaType.APPLICATION_JSON));
        maliciousDelete.andExpect(status().isForbidden());

        opposingUser = userRepository.findByUsername(opposingUsername);
        assertTrue(opposingUser.isPresent(), "User should still exist!");
        user = userRepository.findByUsername(username);
        assertTrue(user.isPresent(), "User should still exist!");
    }
}
