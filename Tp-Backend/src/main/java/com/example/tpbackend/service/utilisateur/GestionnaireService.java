package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.GetDTO.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.models.utilisateur.Employer;
import com.example.tpbackend.models.utilisateur.Gestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GestionnaireService {
    @Autowired
    private GestionnaireRepository gestionnaireRepository;

    @Autowired
    private UtilisateurRepository userRepository;

    public GestionnairePostDTO saveGestionnaire(String firstName,
                                                String lastName,
                                                String phoneNumber,
                                                String matricule,
                                                String email,
                                                String password,
                                                String role){
        if(existsByEmail(email) || existsByMatricule(matricule)){
            return null;
        }

        Utilisateur utilisateur = new Utilisateur(email, password, role);
        Gestionnaire gestionnaire = new Gestionnaire(
                firstName,
                lastName,
                phoneNumber,
                matricule);
        gestionnaire.setUtilisateur(utilisateur);
        System.out.print(utilisateur.getEmail() + utilisateur.getPassword());
        userRepository.save(utilisateur);
        gestionnaireRepository.save(gestionnaire);

        return GestionnairePostDTO.fromGestionnaire(gestionnaire);
    }

    public GestionnairePostDTO saveGestionnaire(GestionnairePostDTO gestionnaireDTO) {
        gestionnaireRepository.save(gestionnaireDTO.toGestionnaire(gestionnaireDTO));
        userRepository.save(gestionnaireDTO.toGestionnaire(gestionnaireDTO).getUtilisateur());
        return gestionnaireDTO;
    }

    public boolean existsByMatricule(String matricule){
        return gestionnaireRepository.existsByMatricule(matricule);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public boolean existsByMatriculeOrEmail(String matricule, String email){
        return gestionnaireRepository.existsByMatriculeOrEmail(matricule, email);
    }

    public GestionnaireGetDTO getGestionnaireByUser(UtilisateurDTO user) {
        Gestionnaire gestionnaire = gestionnaireRepository.findGestionnaireByUser();
        GestionnaireGetDTO gestionnaireGetDTO = new GestionnaireGetDTO(
                gestionnaire.getFirstName(),gestionnaire.getLastName(),gestionnaire.getMatricule(),
                gestionnaire.getPhoneNumber(),user.getEmail());
        return gestionnaireGetDTO;
    }
}
