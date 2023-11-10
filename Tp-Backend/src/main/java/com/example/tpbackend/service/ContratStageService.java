package com.example.tpbackend.service;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.repository.ContratStageRepository;
import com.example.tpbackend.repository.SignatureRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class ContratStageService {

    @Autowired
    private ContratStageRepository contratStageRepository;

    @Autowired
    private SignatureRepository signatureRepository;


    @Transactional
    public ContratStageDTO signerContratEmp(Long contratId, Long empId) {
        Signature signature = signatureRepository.findSignatureByEmployer_Id(empId);
        if (signature == null) {
            throw new EntityNotFoundException("Signature not found for employer with ID: " + empId);
        }
        ContratStage contratStage = contratStageRepository.findContratStageById(contratId);
        if (contratStage == null) {
            throw new EntityNotFoundException("ContratStage not found with ID: " + contratId);
        }
        contratStage.setSignatureEmp(signature);
        contratStageRepository.save(contratStage);
        return new ContratStageDTO().fromContratStage(contratStage);
    }
}
