package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.controllers.GestionnaireController;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.controllers.GestionnaireController;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(GestionnaireController.class)
public class GestionnaireControllerTest {

    @InjectMocks
    private GestionnaireController gestionnaireController;

    @Mock
    @MockBean
    private GestionnaireService gestionnaireService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCreateContrat_Success() {
        ContratStageDTO mockDTO = new ContratStageDTO();
        mockDTO.setId(1L);

        when(gestionnaireService.createContrat(mockDTO)).thenReturn(mockDTO);

        ResponseEntity<ContratStageDTO> response = gestionnaireController.createContrat(mockDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(mockDTO, response.getBody());
    }

    @Test
    public void testCreateContrat_Fail() {
        ContratStageDTO mockDTO = new ContratStageDTO();

        when(gestionnaireService.createContrat(mockDTO)).thenThrow(new RuntimeException("Erreur"));

        ResponseEntity<ContratStageDTO> response = gestionnaireController.createContrat(mockDTO);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());
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

        // Configurer Mockito pour retourner ces objets lors de l'appel du service
        when(gestionnaireService.getCandidaturesAcceptees()).thenReturn(mockedList);

        // Exécuter l'endpoint et vérifier la réponse
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
