package com.example.tpbackend.service;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.repository.ContratStageRepository;
import com.example.tpbackend.repository.SignatureRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContratStageServiceTest {

    @Mock
    private ContratStageRepository contratStageRepository;

    @Mock
    private SignatureRepository signatureRepository;

    @InjectMocks
    private ContratStageService contratStageService;

    @BeforeEach
    void setUp() {
        // Add any setup logic here
    }

    @Test
    void testSignerContratEmp() {
        Long contratId = 1L;
        Long empId = 2L;

        Signature signature = new Signature();
        signature.setId(3L);

        ContratStage contratStage = new ContratStage();


        when(signatureRepository.findSignatureByEmployer_Id(empId)).thenReturn(signature);
        when(contratStageRepository.findContratStageById(contratId)).thenReturn(contratStage);
        when(contratStageRepository.save(contratStage)).thenReturn(contratStage);

        ContratStageDTO contratStageDTO = contratStageService.signerContratEmp(contratId, empId);

        verify(signatureRepository, times(1)).findSignatureByEmployer_Id(empId);
        verify(contratStageRepository, times(1)).findContratStageById(contratId);
        verify(contratStageRepository, times(1)).save(contratStage);

        assertNotNull(contratStageDTO);
        assertEquals(signature.getId(), contratStage.getSignatureEmp().getId());
    }
}
