package com.example.tpbackend.controller.signature;

import com.example.tpbackend.DTO.signature.SignatureEmployerDTO;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.controllers.signature.SignatureEmployerController;
import com.example.tpbackend.service.signature.SignatureEmployerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(SignatureEmployerController.class)
class SignatureEmployerControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SignatureEmployerService signatureEmployerService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    public void testGetSignature() throws Exception {
        SignatureEmployerDTO signature = new SignatureEmployerDTO();
        signature.setImageLink("www.example.org");
        signature.setEmployerId(1);

        when(signatureEmployerService.getSignatureByEmployerId(1)).thenReturn(signature);

        mockMvc.perform(get("/api/v1/stages/signatures/employer/get/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employerId", is(1)))
                .andExpect(jsonPath("$.imageLink", is("www.example.org")));
    }

    @Test
    public void testCreateSignature() throws Exception {
        SignatureEmployerDTO signature = new SignatureEmployerDTO();
        signature.setImageLink("www.example.org");
        signature.setEmployerId(1);

        when(signatureEmployerService.saveEmployerSignature(signature)).thenReturn(signature);
        String jsonContent = objectMapper.writeValueAsString(signature);

        mockMvc.perform(post("/api/v1/stages/signatures/employer/create")
                        .content(jsonContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.imageLink", is("www.example.org")))
                .andExpect(jsonPath("$.employerId", is(1)));
    }

    @Test
    public void testUpdateSignature() throws Exception {
        SignatureEmployerDTO oldSignature = new SignatureEmployerDTO();
        oldSignature.setImageLink("www.example.org");
        oldSignature.setEmployerId(1);

        SignatureEmployerDTO signature = new SignatureEmployerDTO();
        signature.setImageLink("www.google.com");
        signature.setEmployerId(1);

        when(signatureEmployerService.updateEmployerSignature(signature)).thenReturn(signature);

        mockMvc.perform(put("/api/v1/stages/signatures/employer/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signature)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imageLink", is("www.google.com")))
                .andExpect(jsonPath("$.employerId", is(1)))
                .andExpect(jsonPath("$.imageLink", Matchers.not("www.example.org")));
    }
}
