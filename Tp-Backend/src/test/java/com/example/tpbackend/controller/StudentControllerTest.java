package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.controllers.StudentController;
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
                createMockContratStageDTO(1L, studentId, "Position 1"),
                createMockContratStageDTO(2L, studentId, "Position 2")
        );

        when(studentServices.getContratByStudent(studentId)).thenReturn(mockContracts);

        mockMvc.perform(get("/api/v1/student/student-contracts/{studentId}", studentId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(mockContracts.size()))
                .andExpect(jsonPath("$[0].id").value(mockContracts.get(0).getId()))
                .andExpect(jsonPath("$[0].nomDePoste").value(mockContracts.get(0).getNomDePoste()))
                .andExpect(jsonPath("$[0].studentId").value(mockContracts.get(0).getStudentId()))
        // Add more assertions for other fields as necessary
        ;
    }

    @Test
    @WithMockUser(username="admin", roles={"USER","ADMIN"})
    public void testGetContratsByStudent_Failure() throws Exception {
        String studentId = "student1";
        when(studentServices.getContratByStudent(studentId)).thenThrow(new RuntimeException("Unexpected error"));

        mockMvc.perform(get("/api/v1/student/student-contracts/{studentId}", studentId))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string(containsString("")));
    }

    private ContratStageDTO createMockContratStageDTO(Long id, String studentId, String nomDePoste) {
        ContratStageDTO dto = new ContratStageDTO();
        dto.setId(id);
        dto.setStudentId(studentId);
        dto.setNomDePoste(nomDePoste);
        return dto;
    }
}
