package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.controllers.GestionnaireController;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(GestionnaireController.class)
public class GestionnaireControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GestionnaireService gestionnaireService;

    @Test
    public void testCreateContrat_Success() throws Exception {
        ContratStageDTO inputDto = new ContratStageDTO();

        ContratStageDTO mockResponse = new ContratStageDTO();

        when(gestionnaireService.createContrat(any(ContratStageDTO.class))).thenReturn(mockResponse);

        String jsonContent = objectMapper.writeValueAsString(inputDto);

        mockMvc.perform(post("/create-contrat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(mockResponse)));

    }

    @Test
    public void testCreateContrat_ServiceThrowsException() throws Exception {
        ContratStageDTO inputDto = new ContratStageDTO();

        String errorMessage = "Erreur de service";
        when(gestionnaireService.createContrat(any(ContratStageDTO.class))).thenThrow(new RuntimeException(errorMessage));

        String jsonContent = objectMapper.writeValueAsString(inputDto);

        mockMvc.perform(post("/create-contrat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(errorMessage));
    }
}
