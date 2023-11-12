package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.controllers.utilisateur.StudentController;
import com.example.tpbackend.service.security.JwtService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import com.example.tpbackend.service.utilisateur.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentServices studentServices;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private UserService userService;

    @Test
    @WithMockUser(username="admin", roles={"USER","ADMIN"})
    public void testGetContratsByStudent_Success() throws Exception {
        String studentId = "student1";
        List<ContratStageDTO> mockContracts = List.of(
                createMockContratStageDTO(1L, studentId, "Google", "Alice", "Software Engineer"),
                createMockContratStageDTO(2L, studentId, "Facebook", "Bob", "Data Analyst")
        );

        when(studentServices.getContratByStudent(studentId)).thenReturn(mockContracts);

        mockMvc.perform(get("http://localhost:8081/api/v1/student/student-contracts/{studentId}", studentId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].nomDePoste").value("Software Engineer"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].nomDePoste").value("Data Analyst"));
    }

    @Test
    @WithMockUser(username="admin", roles={"USER","ADMIN"})
    public void testGetContratsByStudent_Failure() throws Exception {
        String studentId = "student1";
        doThrow(new RuntimeException("Unexpected error")).when(studentServices).getContratByStudent(studentId);

        mockMvc.perform(get("/api/v1/student/student-contracts/{studentId}", studentId))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string(containsString("Une erreur est survenue lors du traitement de votre requête")));
    }

    private ContratStageDTO createMockContratStageDTO(Long id, String studentId, String employerName, String studentName, String poste) {
        ContratStageDTO dto = new ContratStageDTO();
        dto.setId(id);
        dto.setStudentId(studentId);
        dto.setNomEtudiant(studentName);
        dto.setNomDeCompany(poste);
        return dto;
    }
}
