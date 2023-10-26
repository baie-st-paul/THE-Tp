package com.example.tpbackend.service;

import com.example.tpbackend.DTO.SignatureDTO;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.SignatureRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.rmi.NoSuchObjectException;
import java.util.Optional;

@Service
@NoArgsConstructor
public class SignatureService {
    @Autowired
    private SignatureRepository signatureRepository;

    @Autowired
    private UtilisateurRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;


    public SignatureDTO createEmployerSignature(SignatureDTO signatureDTO) throws Exception{
        Utilisateur user = checkForUser(signatureDTO.getUserEmail());
        Employer employer = getEmployerFromUser(user);
        Signature signature = new Signature();
        signature.setUser(user);
        signature.setImageLink(signatureDTO.getImageLink());
        signatureRepository.save(signature);
        employer.setSignature(signature);
        employerRepository.save(employer);
        return new SignatureDTO(signature);
    }

    public SignatureDTO getEmployerSignature(String userEmail) throws Exception {
        Utilisateur user = checkForUser(userEmail);
        Signature signature = signatureRepository.findByUserId(user.getId());
        return new SignatureDTO(signature);
    }

    public SignatureDTO updateEmployerSignature(SignatureDTO signatureDTO) throws Exception {
        Utilisateur user = checkForUser(signatureDTO.getUserEmail());
        Employer employer = getEmployerFromUser(user);
        Signature signature = signatureRepository.findByUserId(user.getId());
        signature.setImageLink(signatureDTO.getImageLink());
        employer.setSignature(signature);
        employerRepository.save(employer);
        return new SignatureDTO(signatureRepository.save(signature));
    }

    public void deleteEmployerSignature(String userEmail) throws Exception {
        Utilisateur user = checkForUser(userEmail);
        Employer employer = getEmployerFromUser(user);
        Signature signature = signatureRepository.findByUserId(user.getId());
        signatureRepository.delete(signature);
        employer.setSignature(null);
        employerRepository.save(employer);
    }

    private Utilisateur checkForUser(String userEmail) throws Exception{
        Optional<Utilisateur> user = Optional.ofNullable(userRepository.findByEmail(userEmail));
        if(user.isEmpty()) throw new NoSuchObjectException("User not found");
        return user.get();
    }

    private Employer getEmployerFromUser(Utilisateur user){
        return employerRepository.findEmployerByUtilisateur_Email(user.getEmail());
    }
}
