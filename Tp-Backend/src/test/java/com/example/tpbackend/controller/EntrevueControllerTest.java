package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.controllers.EntrevueController;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.service.EntrevueService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import java.time.LocalDate;
import java.util.ArrayList;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@WebMvcTest(EntrevueController.class)
public class EntrevueControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EntrevueService entrevueService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Employeur);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);


        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.com");
        utilisateur2.setId(2L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);


        Student student = new Student();
        student.setFirstName("Jane");
        student.setMatricule("2222222");
        student.setLastName("Student");
        student.setProgram("Informatique");
        student.setPhoneNumber("6625550141");
        student.setOffresStages(new ArrayList<>());
        student.setUtilisateur(utilisateur2);

        Entrevue entrevue = new Entrevue();
        entrevue.setId(1L);
        entrevue.setDateHeure(String.valueOf(LocalDate.now()));
        entrevue.setDescription("Description de l'entrevue");
        entrevue.setStatus(Entrevue.Status.valueOf("EnAttente"));
        entrevue.setEmployer(employer);
        entrevue.setStudent(student);
    }

    @Test
    public void testCreateEntrevue() throws Exception {
        EntrevueDTO mockEntrevueDTO = new EntrevueDTO();
        mockEntrevueDTO.setId(1L);
        mockEntrevueDTO.setDescription("description");
        mockEntrevueDTO.setStatus("EnAttente");
        mockEntrevueDTO.setIdEtudiant("2222222");
        mockEntrevueDTO.setIdEmployeur("1");
        mockEntrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));

        when(entrevueService.createEntrevue(mockEntrevueDTO)).thenReturn(mockEntrevueDTO);

        String jsonContent = objectMapper.writeValueAsString(mockEntrevueDTO);


        mockMvc.perform(post("/api/v1/stages/entrevues")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateEntrevueInvalide() throws Exception {
        EntrevueDTO mockEntrevueDTO = new EntrevueDTO();
        mockEntrevueDTO.setId(1L);
        mockEntrevueDTO.setDescription("description");
        mockEntrevueDTO.setStatus("EnAttente");
        mockEntrevueDTO.setIdEtudiant("2222222");
        mockEntrevueDTO.setIdEmployeur("22222222"); // idEmployeur inexistant
        mockEntrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));

        when(entrevueService.createEntrevue(mockEntrevueDTO))
                .thenThrow(new IllegalArgumentException("Invalid employer ID"));

        String jsonContent = objectMapper.writeValueAsString(mockEntrevueDTO);

        mockMvc.perform(post("/api/v1/stages/entrevues")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isBadRequest());
    }




}
