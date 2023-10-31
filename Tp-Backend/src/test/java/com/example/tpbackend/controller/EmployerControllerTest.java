package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.controllers.EmployerController;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(EmployerController.class)
public class EmployerControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private OffreStageService offreStageService;
    @MockBean
    private StudentServices studentService;
    @MockBean
    private EmployerService employerService;
    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    @Test
    public void testGetApplicantsForOffer() throws Exception {
        mockMvc.perform(get("/api/employers/{offerId}/applicants", 1L))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0]").exists())
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
    public void testAcceptCandidature() throws Exception {
        StudentPostDTO studentPostDTO = new StudentPostDTO(
                "1234567",
                "informatique"
        );



        studentService.saveStudent(
                "first",
                "last",
                "student@gmail.com",
                "+15146878898",
                "1234567",
                "Student",
                studentPostDTO
        );
        EmployerPostDTO employerPostDTO = new EmployerPostDTO(
                "ALaurendeau"
        );
        employerService.saveEmployer(
                "emp",
                "lala",
                "emp@gmail.com",
                "+15146878898",
                "ALaurendeau",
                "Employeur",
                employerPostDTO
        );
        OffreStageDTO offreStageDTO = new OffreStageDTO(
                1,
                1,
                "dev web",
                20,
                "informatique",
                "fdgd f dfg gfdsfs gdd",
                LocalDate.of(2023, 10, 20),
                LocalDate.of(2023, 10, 27),
                "In_review",
                10
        );
        offreStageService.saveOffre(offreStageDTO);
        CandidaturePostDTO candidaturePostDTO = new CandidaturePostDTO(
                studentPostDTO.getMatricule(),
                offreStageDTO.getEmployerId(),
                "abc.pdf",
                null
        );
        studentService.postulerOffre(candidaturePostDTO);
        mockMvc.perform(post("http://localhost:8081/api/employers/candidature/accept/{matricule}/{status}",
                        candidaturePostDTO.getMatricule(), "Accepted"))
                .andExpect(status().isOk());
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
