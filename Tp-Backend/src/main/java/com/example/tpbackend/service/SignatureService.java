package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@NoArgsConstructor
public class SignatureService {
    @Autowired
    private SignatureRepository signatureRepository;

    @Autowired
    private EmployerService employerService;

    public List<SignatureDTO> getSignature() {
        List<Signature> signatures = signatureRepository.findAll();
        List<SignatureDTO> signatureDTOS = new ArrayList<>();

        for (Signature signature: signatures) {
            signatureDTOS.add(signature.toSignatureDTO());
        }

        return signatureDTOS;
    }

    public SignatureDTO saveEmployerSignature(SignatureDTO signatureDTO){
        Signature signature = signatureDTO.toSignature();
        signature.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(signatureDTO.getEmployerId())));
        return signatureRepository.save(signature).toSignatureDTO();
    }

    public Optional<SignatureDTO> getEmployerSignature(long employerId) {
        Signature signature = signatureRepository.findSignatureByEmployer_Id(employerId);
        return Optional.ofNullable(signature.toSignatureDTO());
    }

    public SignatureDTO updateEmployerSignature(SignatureDTO signatureDTO) {
        Signature signature = signatureDTO.toSignature();
        signature.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(signatureDTO.getEmployerId())));

        return saveEmployerSignature(signature.toSignatureDTO());
    }

    public void deleteEmployerSignature(long id) {
        signatureRepository.deleteSignatureById(id);
    }

}
