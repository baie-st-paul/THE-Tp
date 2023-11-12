package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.TagGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private UserService userService;

    @Transactional
    public boolean existByName(String companyName) {
        return employerRepository.existsByCompanyName(companyName);
    }

    @Transactional
    public boolean existByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    @Transactional
    public List<OffreStageDTO> getOffreStageByEmployer(Long id){
        return employerRepository.getOffreStageById(id);
    }

    @Transactional
    public Employer getEmployerById(Long id){
        return employerRepository.findEmployerById(id);
    }

    public EmployerPostDTO saveEmployer(String firstName, String lastName, String email,String phoneNumber, String password, String role, EmployerPostDTO employerPostDTO){
        Utilisateur utilisateur = new Utilisateur(firstName, lastName, email, phoneNumber, password, role);
        Employer employer = new Employer(employerPostDTO.getCompanyName(), utilisateur);
        utilisateurRepository.save(utilisateur);
        employerRepository.save(employer);
        return EmployerPostDTO.fromEmployeur(employer);
    }

    @Transactional
    public EmployerGetDTO getEmployerByAuthentication(){
        Employer employer = employerRepository.findByUtilisateurId(userService.getUserId());
        return EmployerGetDTO.fromEmployer(employer);
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
