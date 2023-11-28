package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.EvaluationMilieuStageDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.controllers.OffreStageController;
import com.example.tpbackend.models.EvaluationMilieuStage;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.TagGenerator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@RunWith(SpringRunner.class)
@WebMvcTest(OffreStageController.class)
public class OffreStageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OffreStageService offreStageService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private List<OffreStageDTO> offres;

    @Before
    public void setup() {

        offres = Arrays.asList(
                new OffreStageDTO(
                        1L,
                        "Titre1",
                        1000.0,
                        "Informatique",
                        "Description1",
                        LocalDate.now(),
                        LocalDate.now().plusDays(10),
                        5,
                        "In_review",
                        "pasVu",
                        "pasVu",
                        5,new Tag(TagGenerator.getCurrentSession()).getTagName()),
                new OffreStageDTO(
                        2L,
                        "Titre2",
                        2000.0,
                        "Architecture",
                        "Description2",
                        LocalDate.now(),
                        LocalDate.now().plusDays(20),
                        7,
                        "Accepted",
                        "pasVu",
                        "pasVu",
                        3L,new Tag(TagGenerator.getCurrentSession()).getTagName())
        );
    }

    /**
     * Ce test vérifie que la méthode getAllOffres() du controller retourne bien une liste d'offres.
     * pour tester la tache EQ2-125-En tant que employeur, je peut voir la liste des offres de stage
     * Dans ce cas précis je regarde si nbMaxEtudiants ne brise pas l,affichage
     * */
    @Test
    public void testGetAllOffresSuccess() throws Exception {
        // Mock
        when(offreStageService.getOffres())
                .thenReturn(offres);

        // Call
        mockMvc.perform(get("/api/v1/stages/offres/"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                // Assertions
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].titre", is("Titre1")))
                .andExpect(jsonPath("$[0].salaire", is(1000.0)))
                .andExpect(jsonPath("$[0].nbMaxEtudiants", is(5)));
    }

    /**
     * Ce test vérifie que la propriété "nbMaxEtudiants" de l'offre d'ID 1 est bien égale à 5.
     * pour tester la tache EQ2-16-En tant que employeur, je peut déterminer le nombre de poste maximal pour une offre de stage
     * */
    @Test
    public void testGetOffreNbMaxEtudiants() throws Exception {
        OffreStageDTO mockOffre = new OffreStageDTO();
        mockOffre.setId(1L);
        mockOffre.setNbMaxEtudiants(5);

        when(offreStageService.getOffreById(1L)).thenReturn(mockOffre);

        mockMvc.perform(get("/api/v1/stages/offres/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.nbMaxEtudiants", is(5)));
    }

    @Test
    public void testUploadEvaluation() throws Exception {
        MockMultipartFile mockFile = new MockMultipartFile("file", "test.pdf", "application/pdf", "PDF content".getBytes());


       // when(offreStageService.saveEvaluationMilieuStage(any(EvaluationMilieuStageDTO.class), anyLong())).thenReturn(offreStageResult);

        mockMvc.perform(multipart("http://localhost:8081/api/v1/stages/offres/1/evaluation").file(mockFile)
                        .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Fichier 'file' reçu et sauvegardé.")));

       // verify(offreStageService).saveEvaluationMilieuStage(any(EvaluationMilieuStageDTO.class), anyLong());
    }
}
