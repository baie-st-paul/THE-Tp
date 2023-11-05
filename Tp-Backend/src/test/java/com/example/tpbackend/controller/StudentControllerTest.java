package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.controllers.StudentController;
import com.example.tpbackend.service.security.JwtService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import com.example.tpbackend.service.utilisateur.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
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

    @InjectMocks
    UserService userService;

    @Test
    public void testGetContratsByStudent_Success() throws Exception {
        String studentId = "student1";
        List<ContratStageDTO> mockContracts = List.of(
                new ContratStageDTO(),
                new ContratStageDTO()
        );

        when(studentServices.getContratByStudent(studentId)).thenReturn(mockContracts);

        mockMvc.perform(get("http://localhost:8081/api/v1/student/student-contracts/{studentId}", studentId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(mockContracts.size()));
    }

    @Test
    public void testGetContratsByStudent_Failure() throws Exception {
        String studentId = "student1";
        when(studentServices.getContratByStudent(studentId)).thenThrow(new RuntimeException("Unexpected error"));

        mockMvc.perform(get("http://localhost:8081/api/v1/student/student-contracts/{studentId}", studentId))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string(containsString("Une erreur est survenue lors du traitement de votre requête")));
    }
}
