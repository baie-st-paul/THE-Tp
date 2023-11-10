package com.example.tpbackend.controller;
import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.service.ContratStageService;
import com.example.tpbackend.controllers.ContratController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class ContratControllerTest {

    @Mock
    private ContratStageService contratService;

    @InjectMocks
    private ContratController contratController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(contratController).build();
    }

    @Test
    @WithMockUser
    void testSigneContratEmp() throws Exception {
        Long contratId = 1L;
        Long empId = 2L;

        when(contratService.signerContratEmp(contratId, empId)).thenReturn(new ContratStageDTO());

        ResultActions resultActions = mockMvc.perform(post("/api/v1/contrats/employer/signe/{contratId}/{empId}", contratId, empId)
                .contentType(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isOk())
                .andExpect(content().string("Contrat Signe par Emp"));
        verify(contratService, times(1)).signerContratEmp(contratId, empId);
        verifyNoMoreInteractions(contratService);
    }

    @Test
    @WithMockUser
    void testSigneContratEmpError() throws Exception {
        Long contratId = 1L;
        Long empId = 2L;
        doThrow(new RuntimeException("Some error")).when(contratService).signerContratEmp(contratId, empId);
        ResultActions resultActions = mockMvc.perform(post("/api/v1/contrats/employer/signe/{contratId}/{empId}", contratId, empId)
                .contentType(MediaType.APPLICATION_JSON));
        resultActions.andExpect(status().isBadRequest());
        verify(contratService, times(1)).signerContratEmp(contratId, empId);
        verifyNoMoreInteractions(contratService);
    }
}