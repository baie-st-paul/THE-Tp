package com.example.tpbackend.controller.signature;

import com.example.tpbackend.DTO.signature.SignatureStudentDTO;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.controllers.signature.SignatureStudentController;
import com.example.tpbackend.service.signature.SignatureStudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(SignatureStudentController.class)
class SignatureStudentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SignatureStudentService signatureStudentService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    public void testGetStudentSignature() throws Exception {
        SignatureStudentDTO signature = new SignatureStudentDTO();
        signature.setImageLink("www.example.org");
        signature.setStudentMatricule("2222222");

        when(signatureStudentService.getSignatureByStudentMatricule("2222222")).thenReturn(signature);

        mockMvc.perform(get("/api/v1/stages/signatures/student/get/2222222")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.studentMatricule", is("2222222")))
                .andExpect(jsonPath("$.imageLink", is("www.example.org")));
    }

    @Test
    public void testCreateStudentSignature() throws Exception {
        SignatureStudentDTO signature = new SignatureStudentDTO();
        signature.setImageLink("www.example.org");
        signature.setStudentMatricule("2222222");

        when(signatureStudentService.saveStudentSignature(signature)).thenReturn(signature);
        String jsonContent = objectMapper.writeValueAsString(signature);

        mockMvc.perform(post("/api/v1/stages/signatures/student/create")
                        .content(jsonContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.imageLink", is("www.example.org")))
                .andExpect(jsonPath("$.studentMatricule", is("2222222")));
    }

    @Test
    public void testUpdateStudentSignature() throws Exception {
        SignatureStudentDTO oldSignature = new SignatureStudentDTO();
        oldSignature.setImageLink("www.example.org");
        oldSignature.setStudentMatricule("2222222");

        SignatureStudentDTO signature = new SignatureStudentDTO();
        signature.setImageLink("www.google.com");
        signature.setStudentMatricule("2222222");

        when(signatureStudentService.updateStudentSignature(signature)).thenReturn(signature);

        mockMvc.perform(put("/api/v1/stages/signatures/student/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signature)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imageLink", is("www.google.com")))
                .andExpect(jsonPath("$.studentMatricule", is("2222222")))
                .andExpect(jsonPath("$.imageLink", Matchers.not("www.example.org")));
    }
}
