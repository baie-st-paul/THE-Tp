package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireDTO;
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

    public GestionnaireDTO saveGestionnaire(String firstName,
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

        return GestionnaireDTO.fromGestionnaire(gestionnaire);
    }

    public GestionnaireDTO saveGestionnaire(GestionnaireDTO gestionnaireDTO) {
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
}
