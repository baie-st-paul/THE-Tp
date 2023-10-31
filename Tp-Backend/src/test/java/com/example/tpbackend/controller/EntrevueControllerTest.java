package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.controllers.EntrevueController;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.service.EntrevueService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import java.time.LocalDate;
import java.util.ArrayList;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import java.util.List;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(EntrevueController.class)
public class EntrevueControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EntrevueService entrevueService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @BeforeEach
    public void setUp() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setFirstName("Jane");
        utilisateur.setPassword("iloveyou");
        utilisateur.setLastName("Doe");
        utilisateur.setRole(Utilisateur.Role.Employeur);
        utilisateur.setPhoneNumber("6625550144");

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setId(1L);
        employer.setOffresStages(new ArrayList<>());
        employer.setUtilisateur(utilisateur);


        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.com");
        utilisateur2.setId(2L);
        utilisateur2.setFirstName("Jane");
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setLastName("Student");
        utilisateur2.setRole(Utilisateur.Role.Student);
        utilisateur2.setPhoneNumber("6625550141");


        Student student = new Student();
        student.setMatricule("2222222");
        student.setProgram("Informatique");
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
    public void testUpdateEntrevueStatus() throws Exception {
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
    @Test
    public void testCreateEntrevueInvalide() throws Exception {
        EntrevueDTO mockEntrevueDTO = new EntrevueDTO();
        mockEntrevueDTO.setIdEmployeur("1");
        mockEntrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));

        when(entrevueService.updateStatus(Mockito.any(), Mockito.anyString()))
                .thenReturn(mockEntrevueDTO);

        String jsonContent = objectMapper.writeValueAsString(mockEntrevueDTO);

        String newStatus = "Refusee";

        mockMvc.perform(put("/api/v1/stages/entrevues")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent)
                        .param("newStatus", newStatus))
                .andExpect(status().isOk());

    }

    @Test
    public void testGetStudentEntrevues_Success() throws Exception {
        List<EntrevueDTO> mockEntrevueList = new ArrayList<>();
        EntrevueDTO mockEntrevueDTO = new EntrevueDTO();
        mockEntrevueDTO.setId(1L);
        mockEntrevueDTO.setDescription("description");
        mockEntrevueDTO.setStatus("EnAttente");
        mockEntrevueDTO.setIdEtudiant("2222222");
        mockEntrevueDTO.setIdEmployeur("1");
        mockEntrevueDTO.setDateHeure(String.valueOf(LocalDate.now()));

        EntrevueDTO mockEntrevueDTO2 = new EntrevueDTO();
        mockEntrevueDTO2.setId(2L);
        mockEntrevueDTO2.setDescription("description2");
        mockEntrevueDTO2.setStatus("EnAttente");
        mockEntrevueDTO2.setIdEtudiant("2222222");
        mockEntrevueDTO2.setIdEmployeur("1");
        mockEntrevueDTO2.setDateHeure(String.valueOf(LocalDate.now().plusDays(2)));

        mockEntrevueList.add(mockEntrevueDTO);
        mockEntrevueList.add(mockEntrevueDTO2);


        when(entrevueService.getStudentEntrevues("2222222")).thenReturn(mockEntrevueList);

        mockMvc.perform(get("/api/v1/stages/entrevues/students/2222222")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(mockEntrevueList.size())));
    }
}
