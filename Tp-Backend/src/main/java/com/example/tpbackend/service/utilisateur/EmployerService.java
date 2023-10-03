package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class
EmployerService {
    private final EmployerRepository employerRepository;
    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    public EmployerService(EmployerRepository employerRepository, UtilisateurRepository utilisateurRepository) {
        this.employerRepository = employerRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    public boolean existByName(String companyName) {
        return employerRepository.existsByCompanyName(companyName);
    }

    public boolean existByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    public List<OffreStageDTO> getOffreStageByEmployer(Long id){
        return employerRepository.getOffreStageById(id);
    }


    public EmployerPostDTO saveEmployer(EmployerPostDTO employerPostDTO, String email, String password, String role){
        Utilisateur utilisateur = new Utilisateur(email, password,role);
        Employer employer = employerPostDTO.toEmployer(employerPostDTO);
        employer.setUtilisateur(utilisateur);
        utilisateurRepository.save(utilisateur);
        employerRepository.save(employer);
        return EmployerPostDTO.fromEmployeur(employer);
    }

    public EmployerGetDTO getEmployeurByUser(UtilisateurDTO utilisateurDTO){
        Employer employer = employerRepository.findStudentByUtilisateur();
        return new EmployerGetDTO(
                employer.getId(), employer.getFirstName(),employer.getLastName(),employer.getCompanyName(),
                employer.getPhoneNumber(),utilisateurDTO.getEmail());
    }
}
