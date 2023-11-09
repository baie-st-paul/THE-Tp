package com.example.tpbackend.service;


import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.repository.ContratStageRepository;
import com.example.tpbackend.repository.SignatureRepository;
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
        ContratStage contratStage = contratStageRepository.findSignatureByContrat_Id(contratId);
        contratStage.setSignatureEmp(signature);
        contratStageRepository.save(contratStage);
        return new ContratStageDTO().fromContratStage(contratStage);
    }
}
