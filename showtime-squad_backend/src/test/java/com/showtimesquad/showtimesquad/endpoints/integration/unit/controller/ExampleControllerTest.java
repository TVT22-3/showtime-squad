package com.showtimesquad.showtimesquad.endpoints.integration.unit.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.showtimesquad.showtimesquad.controller.ExampleController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ExampleControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate template;

    @Test
    void shouldReturnOK() {
        final ResponseEntity<ExampleController> response = template.getForEntity(String.format("http://localhost:%d/movies"
                , port), ExampleController.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

    }
}
