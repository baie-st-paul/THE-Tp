package com.example.tpbackend.controller.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTODetailed;
import com.example.tpbackend.config.JwtAuthenticationFilter;
import com.example.tpbackend.controllers.utilisateur.GestionnaireController;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(GestionnaireController.class)
public class GestionnaireControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private GestionnaireService gestionnaireService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    @Test
    public void testCreateContrat_Success() throws Exception {
        ContratStageDTO inputDto = new ContratStageDTO();
        inputDto.setId(1L);
        inputDto.setStudentId("0938473");
        inputDto.setEmployerId(1L);

        ContratStageDTO mockResponse = new ContratStageDTO();
        mockResponse.setId(1L);
        mockResponse.setStudentId("0938473");
        mockResponse.setEmployerId(1L);

        when(gestionnaireService.createContrat(any(ContratStageDTO.class))).thenReturn(mockResponse);

        String jsonContent = objectMapper.writeValueAsString(inputDto);

        mockMvc.perform(MockMvcRequestBuilders.post("http://localhost:8081/api/v1/gestionnaire/create-contrat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(mockResponse)))
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.studentId").value("0938473"))
                .andExpect(jsonPath("$.employerId").value(1L));
    }

    @Test
    public void testCreateContrat_ServiceThrowsException() throws Exception {
        ContratStageDTO inputDto = new ContratStageDTO();

        String errorMessage = "Erreur de service";
        when(gestionnaireService.createContrat(any(ContratStageDTO.class))).thenThrow(new RuntimeException(errorMessage));

        String jsonContent = objectMapper.writeValueAsString(inputDto);

        mockMvc.perform(MockMvcRequestBuilders.post("http://localhost:8081/api/v1/gestionnaire/create-contrat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(errorMessage));
    }

    @Test
    public void getAllContratsTest() throws Exception {
        ContratStageDTO contrat1 = new ContratStageDTO();
        contrat1.setId(1L);
        contrat1.setStudentId("0123456");
        contrat1.setEmployerId(1L);

        ContratStageDTO contrat2 = new ContratStageDTO();
        contrat2.setId(2L);
        contrat2.setStudentId("student2");
        contrat2.setEmployerId(1L);

        List<ContratStageDTO> contratStageDTOS = Arrays.asList(contrat1, contrat2);

        when(gestionnaireService.getAllContrats()).thenReturn(contratStageDTOS);

        mockMvc.perform(get("http://localhost:8081/api/v1/gestionnaire/getContrats"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(contrat1.getId()))
                .andExpect(jsonPath("$[0].studentId").value(contrat1.getStudentId()))
                .andExpect(jsonPath("$[0].employerId").value(contrat1.getEmployerId()))
                .andExpect(jsonPath("$[1].id").value(contrat2.getId()))
                .andExpect(jsonPath("$[1].studentId").value(contrat2.getStudentId()))
                .andExpect(jsonPath("$[1].employerId").value(contrat2.getEmployerId()));
    }



    @Test
    public void testGetCandidaturesAcceptees() throws Exception {
        CandidatureDTODetailed dto1 = new CandidatureDTODetailed();
        dto1.setId(1L);
        dto1.setFileName("fileName1");
        dto1.setStatus("accepted");

        CandidatureDTODetailed dto2 = new CandidatureDTODetailed();
        dto2.setId(2L);
        dto2.setFileName("fileName2");
        dto2.setStatus("accepted");

        List<CandidatureDTODetailed> mockedList = Arrays.asList(dto1, dto2);

        when(gestionnaireService.getCandidaturesAcceptees()).thenReturn(mockedList);

        mockMvc.perform(get("http://localhost:8081/api/v1/gestionnaire/candidatures/acceptees"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.size()", is(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].fileName", is("fileName1")))
                .andExpect(jsonPath("$[0].status", is("accepted")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].fileName", is("fileName2")))
                .andExpect(jsonPath("$[1].status", is("accepted")));

        verify(gestionnaireService, times(1)).getCandidaturesAcceptees();
    }

    @Test
    @WithMockUser
    public void getAllCvsTest() throws Exception {
        CvDTO cv1 = new CvDTO();
        cv1.setMatricule("1234");
        cv1.setFileName("cv1.pdf");
        cv1.setStatus("Accepted");
        cv1.setStatusVuPasVuG("vu");
        cv1.setStatusVuPasVuE("pasVu");

        CvDTO cv2 = new CvDTO();
        cv2.setMatricule("5678");
        cv2.setFileName("cv2.pdf");
        cv2.setStatus("In_review");
        cv2.setStatusVuPasVuG("vu");
        cv2.setStatusVuPasVuE("vu");

        List<CvDTO> cvDTOList = Arrays.asList(cv1, cv2);

        when(gestionnaireService.getAllCvs()).thenReturn(cvDTOList);

        mockMvc.perform(get("http://localhost:8081/api/v1/gestionnaire/cvs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].matricule").value("1234"))
                .andExpect(jsonPath("$[0].statusVuPasVuG").value("vu"))
                .andExpect(jsonPath("$[0].statusVuPasVuE").value("pasVu"))
                .andExpect(jsonPath("$[1].matricule").value("5678"))
                .andExpect(jsonPath("$[1].statusVuPasVuG").value("vu"))
                .andExpect(jsonPath("$[1].statusVuPasVuE").value("vu"));
    }
}
