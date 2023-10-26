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

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
        signature.setUserEmail("jane.doe@example.org");

        when(signatureService.getEmployerSignature(any())).thenReturn(signature);

        mockMvc.perform(get("/api/v1/stages/signatures/employers/jane.doe@example.org")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imageLink", is("www.example.org")))
                .andExpect(jsonPath("$.userEmail", is("jane.doe@example.org")));
    }

    @Test
    public void testUpdateSignature() throws Exception {
        SignatureDTO oldSignature = new SignatureDTO();
        oldSignature.setImageLink("www.example.org");
        oldSignature.setUserEmail("jane.doe@example.org");

        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.google.com");
        signature.setUserEmail("jane.doe@example.org");

        when(signatureService.updateEmployerSignature(signature)).thenReturn(signature);

        mockMvc.perform(put("/api/v1/stages/signatures/employers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signature)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imageLink", is("www.google.com")))
                .andExpect(jsonPath("$.userEmail", is("jane.doe@example.org")))
                .andExpect(jsonPath("$.imageLink", Matchers.not("www.example.org")));
    }

    @Test
    public void testCreateSignature() throws Exception {
        SignatureDTO signature = new SignatureDTO();
        signature.setImageLink("www.example.org");
        signature.setUserEmail("jane.doe@example.org");


}
