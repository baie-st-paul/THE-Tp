package com.example.tpbackend.controller;


import com.example.tpbackend.controllers.EmployerController;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;




@WebMvcTest(EmployerController.class)
public class EmployerControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private OffreStageService offfreStageService;
    @MockBean
    private StudentServices studentService;

    @Test
    public void testGetApplicantsForOffer() throws Exception {
        mockMvc.perform(get("/api/employers/{offerId}/applicants", 1L))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                // Vérifiez que la réponse est une liste en vérifiant que le premier élément existe
                .andExpect(jsonPath("$[0]").exists())
                // Vérifiez l'id et le nom du premier candidat (ajustez selon la structure réelle de CandidatureDTO)
                .andExpect(jsonPath("$[0].id").value(42L))
                .andExpect(jsonPath("$[0].name").value("Test"));
    }


    @Test
    public void testGetApplicantsForOffer_NoOfferFound() throws Exception {
        mockMvc.perform(get("/api/employers/{offerId}/applicants", 2L)) // je Suppose que 2L est un ID pour lequel il n'y a pas d'offre
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("Aucune offre trouvée avec cet ID."));
    }


    @Test
    public void testGetApplicantsForOfferNoApplicants() throws Exception {
        mockMvc.perform(get("/api/employers/{offerId}/applicants", 3L))  // je Suppose que 3L soit un ID d'offre sans candidats
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("Aucune candidature trouvée pour cette offre."));
    }


    @Test
    public void testGetApplicantsForOffer_InvalidId() throws Exception {
        mockMvc.perform(get("/api/employers/{offerId}/applicants", "invalid")) // je Suppose que "invalid" est un ID invalide
                .andExpect(status().isBadRequest());
    }


}
