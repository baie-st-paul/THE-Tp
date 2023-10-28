package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@NoArgsConstructor
public class SignatureService {
    @Autowired
    private SignatureRepository signatureRepository;


    @Autowired
    private EmployerRepository employerRepository;


    public SignatureDTO createEmployerSignature(SignatureDTO signatureDTO){
        Employer employer = employerRepository.findEmployerByUtilisateur_Email(signatureDTO.getUserEmail());
        Signature signature = new Signature();
        signature.setEmployer(employer);
        signature.setImageLink(signatureDTO.getImageLink());
        signatureRepository.save(signature);
        employer.setSignature(signature);
        employerRepository.save(employer);
        return new SignatureDTO(signature);
    }

    public SignatureDTO getEmployerSignature(String userEmail) {
        Signature signature = signatureRepository.findByEmployer_Utilisateur_Email(userEmail);
        return new SignatureDTO(signature);
    }

    public SignatureDTO updateEmployerSignature(SignatureDTO signatureDTO) {
        Employer employer = employerRepository.findEmployerByUtilisateur_Email(signatureDTO.getUserEmail());
        Signature signature = signatureRepository.findByEmployer_Utilisateur_Email(signatureDTO.getUserEmail());
        signature.setImageLink(signatureDTO.getImageLink());
        employer.setSignature(signature);
        employerRepository.save(employer);
        return new SignatureDTO(signatureRepository.save(signature));
    }

    public void deleteEmployerSignature(String userEmail) {
        Employer employer = employerRepository.findEmployerByUtilisateur_Email(userEmail);
        Signature signature = signatureRepository.findByEmployer_Utilisateur_Email(userEmail);
        signatureRepository.delete(signature);
        employer.setSignature(null);
        employerRepository.save(employer);
    }

}
