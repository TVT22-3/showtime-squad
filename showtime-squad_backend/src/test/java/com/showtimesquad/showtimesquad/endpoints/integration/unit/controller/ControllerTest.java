package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.showtimesquad.showtimesquad.controller.Controller;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ControllerTest {
    @Autowired
    private Controller controller;

    @Test
    void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }
}
