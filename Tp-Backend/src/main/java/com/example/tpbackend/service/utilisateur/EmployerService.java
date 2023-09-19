package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.GetDTO.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.PostDTO.EmployerPostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Employer;
import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.models.utilisateur.Utilisateur;
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

    public boolean existByName(String companyName) {
        return employerRepository.existsByCompanyName(companyName);
    }

    public boolean existByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
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
        EmployerGetDTO employerGetDTO = new EmployerGetDTO(
                employer.getFirstName(),employer.getLastName(),employer.getCompanyName(),
                employer.getPhoneNumber(),utilisateurDTO.getEmail());
        return employerGetDTO;
    }
}
