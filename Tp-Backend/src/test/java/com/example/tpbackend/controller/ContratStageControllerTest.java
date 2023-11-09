package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.controllers.ContratController;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.service.ContratStageServiceTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ContratController.class)
public class ContratStageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContratStageServiceTest contratStageService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testSignerContrat() throws Exception {
        Utilisateur utilisateurStudent = new Utilisateur("Ivan","Jimenez","ivanJr@gmail.com","4389222222","Root!123","Student");
        Student student = new Student("0987654","Informatique",utilisateurStudent);

        Utilisateur utilisateurEmp = new Utilisateur("Ivan","Jimenez","ivanJr1@gmail.com","4389222223","Root!123","Employeur");
        Employer employer = new Employer(2L,"AlCals",utilisateurEmp);
        ContratStage contratStage = new ContratStage(1L,student, employer);
        ContratStageDTO contratStageDTO = new ContratStageDTO();
        when(contratStageService.signerContratEmp(contratStage.getId(), employer.getId())).thenReturn(contratStageDTO);
        String jsonContent = objectMapper.writeValueAsString(contratStageDTO);

        mockMvc.perform(post("/api/v1/contrats/"+contratStage.getId()+"/"+employer.getId())
                        .content(jsonContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.contratId", is(1L)))
                .andExpect(jsonPath("$.empId", is(2L)));
    }
}
