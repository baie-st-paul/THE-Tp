package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.Authentication.JwtAuthenticationResponse;
import com.example.tpbackend.DTO.Authentication.LoginRequest;
import com.example.tpbackend.DTO.Authentication.RegisterRequest;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.service.security.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedHashMap;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UtilisateurController.class)
public class UtilisateurControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private JwtAuthenticationResponse jwtAuthenticationResponse;

    @MockBean
    private UtilisateurController utilisateurController;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testRegister() throws Exception {
        LinkedHashMap<String, String> employerDTO = new LinkedHashMap<>();
        employerDTO.put("companyName", "companyName");

        RegisterRequest<?> registerRequest = new RegisterRequest<>(
                "Spring",
                "Security",
                "springsecurity3@gmail.com",
                "phoneNumber",
                "password",
                "Employeur",
                employerDTO
        );
        mockMvc.perform(post("/api/v1/utilisateur/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest))
            ).andExpect(status().isOk());

        LinkedHashMap<String, String> gestionnaireDTO = new LinkedHashMap<>();
        gestionnaireDTO.put("matricule", "1234567");

        RegisterRequest<?> registerRequest2 = new RegisterRequest<>(
                "Spring",
                "Security",
                "springsecurity2@gmail.com",
                "phoneNumber",
                "password",
                "Gestionnaire",
                gestionnaireDTO
        );
        mockMvc.perform(post("/api/v1/utilisateur/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest2))
        ).andExpect(status().isOk());

        LinkedHashMap<String, String> studentDTO = new LinkedHashMap<>();
        studentDTO.put("matricule", "1234567");
        studentDTO.put("program", "info");

        RegisterRequest<?> registerRequest3 = new RegisterRequest<>(
                "Spring",
                "Security",
                "springsecurity3@gmail.com",
                "phoneNumber",
                "password",
                "Student",
                studentDTO
        );
        System.out.println(objectMapper.writeValueAsString(registerRequest));
        mockMvc.perform(post("/api/v1/utilisateur/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest3))
        ).andExpect(status().isOk());
    }


    @Test
    public void testLogin() throws Exception {
        LinkedHashMap<String, String> employerDTO = new LinkedHashMap<>();
        employerDTO.put("companyName", "companyName");

        RegisterRequest<?> registerRequest = new RegisterRequest<>(
                "Spring",
                "Security",
                "springsecurity@gmail.com",
                "phoneNumber",
                "12345",
                "Employeur",
                employerDTO
        );
        mockMvc.perform(post("/api/v1/utilisateur/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest))
        ).andExpect(status().isOk());


        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("springsecurity@gmail.com");
        loginRequest.setPassword("12345");
        mockMvc.perform(post("/api/v1/utilisateur/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest))
        ).andExpect(status().isOk());
    }
}

