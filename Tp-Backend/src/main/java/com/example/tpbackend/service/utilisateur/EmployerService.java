package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.ContratStageRepository;
import com.example.tpbackend.repository.TagRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.TagGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    @Autowired
    ContratStageRepository contratStageRepository;

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

    public void updateStatusContratVuE(String matricule, String statusVu) {
        contratStageRepository.updateStatusVuPasVuEByMatricule(matricule, ContratStage.StatusVuPasVu.valueOf(statusVu));
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
    @Transactional
   public List<ContratStageDTO> getContratStageByEmployeur(Long employeurId) {
        List<ContratStage> contrats = contratStageRepository.findByEmployeur_Id(employeurId);
        return contrats.stream().map(ContratStageDTO::fromContratStage).collect(Collectors.toList());
   }
    @Transactional
    public void signContract(ContratStageDTO contractDTO) throws Exception {
        Optional<ContratStage> optionalContract = contratStageRepository.findById(contractDTO.getId());
        if(optionalContract.isEmpty()) throw new Exception("Contract not found");
        ContratStage contract = optionalContract.get();
        contract.setStatutEmployeur(ContratStage.Statut.Signer);
        contratStageRepository.save(contract);
    }
}
