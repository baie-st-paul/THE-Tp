package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.utilisateur.employeur.GetDTO.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.PostDTO.EmployerPostDTO;
import com.example.tpbackend.models.utilisateur.Employer;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployerService {

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public boolean existByCompagnyId(String companyName) {
        return employerRepository.existsByCompanyName(companyName);
    }

    public boolean existByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    public EmployerPostDTO saveEmployer(EmployerPostDTO employerPostDTO){
        employerRepository.save(employerPostDTO.toEmployer());
        utilisateurRepository.save(employerPostDTO.toEmployer().getUtilisateur());
        return employerPostDTO;
    }

    public EmployerGetDTO getEmployer(String companyId){
        Employer employer = employerRepository.getByCompanyId(companyId);
        return EmployerGetDTO.fromEmployer(employer);
    }
}
