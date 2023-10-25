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

@ExtendWith(SpringExtension.class)
@WebMvcTest(GestionnaireController.class)
public class GestionnaireControllerTest {

    @InjectMocks
    private GestionnaireController gestionnaireController;

    @Mock
    private GestionnaireService gestionnaireService;

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
}
