package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.TagGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class
EmployerService {
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private TagRepository tagRepository;

    public boolean existByName(String companyName) {
        return employerRepository.existsByCompanyName(companyName);
    }

    public boolean existByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    public List<OffreStageDTO> getOffreStageByEmployer(Long id){
        return employerRepository.getOffreStageById(id);
    }

    public EmployerGetDTO getEmployerById(Long id){
        Employer employer = employerRepository.findEmployerById(id);
        return new EmployerGetDTO(
                employer.getId(), employer.getFirstName(),employer.getLastName(),employer.getCompanyName(),
                employer.getPhoneNumber(),employer.getUtilisateur().getEmail());
    }

    public EmployerPostDTO saveEmployer(EmployerPostDTO employerPostDTO, String email, String password, String role){
        Utilisateur utilisateur = new Utilisateur(email, password, role);
        Employer employer = employerPostDTO.toEmployer(employerPostDTO);
        employer.setUtilisateur(utilisateur);
        System.out.println(utilisateur.getEmail() + ", " + utilisateur.getPassword() + ", " + utilisateur.getRole());
        utilisateurRepository.save(utilisateur);
        employerRepository.save(employer);
        return EmployerPostDTO.fromEmployeur(employer);
    }

    public EmployerGetDTO getEmployeurByUser(UtilisateurDTO utilisateurDTO){
        Employer employer = employerRepository.findEmployerByUtilisateur();
        System.out.println(employer);
        return new EmployerGetDTO(
                employer.getId(), employer.getFirstName(),employer.getLastName(),employer.getCompanyName(),
                employer.getPhoneNumber(),utilisateurDTO.getEmail());
    }

    public Tag getTag(){
        Tag tag;
        try{
            tag = new Tag(TagGenerator.getCurrentSession());
            tagRepository.save(tag);
        }catch (Exception e){
            tag = new Tag(TagGenerator.getCurrentSession());
        }
        return tag;
    }
}
