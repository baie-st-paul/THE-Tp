package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.controllers.GestionnaireController;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
        inputDto.setId(1L);
        inputDto.setStudentId("0938473");
        inputDto.setEmployerId(1L);

        ContratStageDTO mockResponse = new ContratStageDTO();
        mockResponse.setId(1L);
        mockResponse.setStudentId("0938473");
        mockResponse.setEmployerId(1L);

        when(gestionnaireService.createContrat(any(ContratStageDTO.class))).thenReturn(mockResponse);

        String jsonContent = objectMapper.writeValueAsString(inputDto);

        mockMvc.perform(MockMvcRequestBuilders.post("http://localhost:8081/api/v1/gestionnaire/create-contrat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(mockResponse)))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.studentId").value("0938473"))
                .andExpect(jsonPath("$.employerId").value(1L));
    }

    @Test
    public void testCreateContrat_ServiceThrowsException() throws Exception {
        ContratStageDTO inputDto = new ContratStageDTO();

        String errorMessage = "Erreur de service";
        when(gestionnaireService.createContrat(any(ContratStageDTO.class))).thenThrow(new RuntimeException(errorMessage));

        String jsonContent = objectMapper.writeValueAsString(inputDto);

        mockMvc.perform(MockMvcRequestBuilders.post("http://localhost:8081/api/v1/gestionnaire/create-contrat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(errorMessage));
    }

    @Test
    public void testGetCandidaturesAcceptees() throws Exception {
        // Créez quelques objets DTO de test mockés
        CandidatureDTO dto1 = mock(CandidatureDTO.class);
        CandidatureDTO dto2 = mock(CandidatureDTO.class);

        when(dto1.getId()).thenReturn(1L);
        when(dto1.getFileName()).thenReturn("fileName1");
        when(dto1.getStatus()).thenReturn("accepted");

        when(dto2.getId()).thenReturn(2L);
        when(dto2.getFileName()).thenReturn("fileName2");
        when(dto2.getStatus()).thenReturn("accepted");

        List<CandidatureDTO> mockedList = Arrays.asList(dto1, dto2);

        when(gestionnaireService.getCandidaturesAcceptees()).thenReturn(mockedList);

        mockMvc.perform(get("http://localhost:8081/api/v1/gestionnaire/candidatures/acceptees"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()", is(2)))
                .andExpect(jsonPath("$[0].id", is(dto1.getId().intValue())))
                .andExpect(jsonPath("$[0].fileName", is(dto1.getFileName())))
                .andExpect(jsonPath("$[0].status", is(dto1.getStatus())))
                .andExpect(jsonPath("$[1].id", is(dto2.getId().intValue())))
                .andExpect(jsonPath("$[1].fileName", is(dto2.getFileName())))
                .andExpect(jsonPath("$[1].status", is(dto2.getStatus())));

        verify(gestionnaireService, times(1)).getCandidaturesAcceptees();
    }
}
