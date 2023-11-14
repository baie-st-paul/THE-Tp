package com.example.tpbackend.controller.signature;

import com.example.tpbackend.DTO.signature.SignatureGestionnaireDTO;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.controllers.signature.SignatureGestionnaireController;
import com.example.tpbackend.service.signature.SignatureGestionnaireService;
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
@WebMvcTest(SignatureGestionnaireController.class)
public class SignatureGestionnaireControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SignatureGestionnaireService signatureGestionnaireService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    public void testGetGestionnaireSignature() throws Exception {
        SignatureGestionnaireDTO signature = new SignatureGestionnaireDTO();
        signature.setImageLink("www.example.org");
        signature.setGestionnaireMatricule("2222222");

        when(signatureGestionnaireService.getGestionnaireSignature("2222222")).thenReturn(signature);

        mockMvc.perform(get("/api/v1/stages/signatures/gestionnaire/get/2222222")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.gestionnaireMatricule", is("2222222")))
                .andExpect(jsonPath("$.imageLink", is("www.example.org")));
    }

    @Test
    public void testCreateGestionnaireSignature() throws Exception {
        SignatureGestionnaireDTO signature = new SignatureGestionnaireDTO();
        signature.setImageLink("www.example.org");
        signature.setGestionnaireMatricule("2222222");

        when(signatureGestionnaireService.saveGestionnaireSignature(signature)).thenReturn(signature);
        String jsonContent = objectMapper.writeValueAsString(signature);

        mockMvc.perform(post("/api/v1/stages/signatures/gestionnaire/create")
                        .content(jsonContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.imageLink", is("www.example.org")))
                .andExpect(jsonPath("$.gestionnaireMatricule", is("2222222")));
    }

    @Test
    public void testUpdateGestionnaireSignature() throws Exception {
        SignatureGestionnaireDTO oldSignature = new SignatureGestionnaireDTO();
        oldSignature.setImageLink("www.example.org");
        oldSignature.setGestionnaireMatricule("2222222");

        SignatureGestionnaireDTO signature = new SignatureGestionnaireDTO();
        signature.setImageLink("www.google.com");
        signature.setGestionnaireMatricule("2222222");

        when(signatureGestionnaireService.updateGestionnaireSignature(signature)).thenReturn(signature);

        mockMvc.perform(put("/api/v1/stages/signatures/gestionnaire/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signature)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imageLink", is("www.google.com")))
                .andExpect(jsonPath("$.gestionnaireMatricule", is("2222222")))
                .andExpect(jsonPath("$.imageLink", Matchers.not("www.example.org")));
    }
}
