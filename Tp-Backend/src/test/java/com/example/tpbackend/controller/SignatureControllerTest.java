package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.controllers.SignatureController;
import com.example.tpbackend.service.SignatureService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(SignatureController.class)
public class SignatureControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SignatureService signatureService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetSignature() throws Exception {
        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.example.org");
        signature.setEmployerId(1);

        when(signatureService.getEmployerSignature(1)).thenReturn(Optional.of(signature));

        mockMvc.perform(get("/api/v1/stages/signatures/employers/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employerId", is(1)))
                .andExpect(jsonPath("$.imageLink", is("www.example.org")));
    }

    @Test
    public void testUpdateSignature() throws Exception {
        SignatureDTO oldSignature = new SignatureDTO();
        oldSignature.setImageLink("www.example.org");
        oldSignature.setEmployerId(1);

        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.google.com");
        signature.setEmployerId(1);

        when(signatureService.updateEmployerSignature(signature)).thenReturn(signature);

        mockMvc.perform(put("/api/v1/stages/signatures/employers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signature)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imageLink", is("www.google.com")))
                .andExpect(jsonPath("$.employerId", is(1)))
                .andExpect(jsonPath("$.imageLink", Matchers.not("www.example.org")));
    }

    @Test
    public void testCreateSignature() throws Exception {
        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.example.org");
        signature.setEmployerId(1);

        when(signatureService.saveEmployerSignature(signature)).thenReturn(signature);
        String jsonContent = objectMapper.writeValueAsString(signature);

        mockMvc.perform(post("/api/v1/stages/signatures/employers/create")
                        .content(jsonContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.imageLink", is("www.example.org")))
                .andExpect(jsonPath("$.employerId", is(1)));
    }

    @Test
    public void testGetStudentSignature() throws Exception {
        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.example.org");
        signature.setStudentMatricule("2222222");

        when(signatureService.getStudentSignature("2222222")).thenReturn(signature);

        mockMvc.perform(get("/api/v1/stages/signatures/students/2222222")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentMatricule", is("2222222")))
                .andExpect(jsonPath("$.imageLink", is("www.example.org")));
    }

    @Test
    public void testUpdateStudentSignature() throws Exception {
        SignatureDTO oldSignature = new SignatureDTO();
        oldSignature.setImageLink("www.example.org");
        oldSignature.setStudentMatricule("2222222");

        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.google.com");
        signature.setStudentMatricule("2222222");

        when(signatureService.updateEmployerSignature(signature)).thenReturn(signature);

        mockMvc.perform(put("/api/v1/stages/signatures/employers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signature)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imageLink", is("www.google.com")))
                .andExpect(jsonPath("$.studentMatricule", is("2222222")))
                .andExpect(jsonPath("$.imageLink", Matchers.not("www.example.org")));
    }

    @Test
    public void testCreateStudentSignature() throws Exception {
        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.example.org");
        signature.setStudentMatricule("2222222");

        when(signatureService.createStudentSignature(signature)).thenReturn(signature);
        String jsonContent = objectMapper.writeValueAsString(signature);

        mockMvc.perform(post("/api/v1/stages/signatures/students/create")
                        .content(jsonContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.imageLink", is("www.example.org")))
                .andExpect(jsonPath("$.studentMatricule", is("2222222")));
    }


}
