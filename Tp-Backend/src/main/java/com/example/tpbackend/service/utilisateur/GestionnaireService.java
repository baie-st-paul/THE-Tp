package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireDTO;
import com.example.tpbackend.models.utilisateur.Gestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.utilisateur.ManagerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GestionnaireService {
    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UtilisateurRepository userRepository;

    public GestionnaireDTO saveGestionnaire(String email, String password, String matricule){
        if(existsByEmail(email) || existsByMatricule(matricule)){
            return null;
        }

        Utilisateur utilisateur = new Utilisateur(email, password, "Gestionnaire");
        Gestionnaire gestionnaire = new Gestionnaire(matricule, utilisateur);
        System.out.print(utilisateur.getEmail() + utilisateur.getPassword());
        userRepository.save(utilisateur);
        managerRepository.save(gestionnaire);

        return GestionnaireDTO.fromGestionnaire(gestionnaire);
    }

    public boolean existsByMatricule(String matricule){
        return managerRepository.existsByMatricule(matricule);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }


}
