package com.example.tpbackend.controller;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.controllers.StudentController;
import com.example.tpbackend.service.security.JwtService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import com.example.tpbackend.service.utilisateur.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(StudentController.class)
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentServices studentService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    JwtService jwtService;

    @MockBean
    UserService userService;


    @Test
    public void testSignContract() throws Exception {
        ContratStageDTO contratStageDTO = new ContratStageDTO();
        contratStageDTO.setStudentId("2222222");
        contratStageDTO.setId(1L);
        contratStageDTO.setEmployerId(1L);

        when(studentService.signContract(contratStageDTO)).thenReturn(contratStageDTO);

        mockMvc.perform(post("/api/v1/student/signContract")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(contratStageDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentId", is("2222222")))
                .andExpect(jsonPath("$.employerId", is(1)))
                .andExpect(jsonPath("$.id", is(1)));
    }
}
