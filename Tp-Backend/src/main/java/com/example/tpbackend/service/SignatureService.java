package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@NoArgsConstructor
public class SignatureService {
    @Autowired
    private SignatureRepository signatureRepository;

    @Autowired
    private EmployerService employerService;

    @Autowired
    private EmployerRepository employerRepository;


    public SignatureDTO saveEmployerSignature(SignatureDTO signatureDTO){
        Signature signature = signatureDTO.toSignature();
        signature.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(signatureDTO.getEmployerId())));
        return signatureRepository.save(signature).toSignatureDTO();
    }

    public SignatureDTO getEmployerSignature(long employerId) {
        return signatureRepository.findByEmployer_Id(employerId).toSignatureDTO();
    }

    public SignatureDTO updateEmployerSignature(long id, SignatureDTO signatureDTO) {
        Signature signature = signatureDTO.toSignature();
        signature.setId(id);
        signature.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(signatureDTO.getEmployerId())));

        return saveEmployerSignature(signature.toSignatureDTO());
    }

    public void deleteEmployerSignature(long id) {
        signatureRepository.deleteSignatureById(id);
    }

}
