package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UtilisateurRepository utilisateurRepository;

    @Autowired
    public UserService(UtilisateurRepository utilisateurRepository){
        this.utilisateurRepository = utilisateurRepository;
    }



    public Utilisateur findByEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return utilisateurRepository.existsByEmail(email);
    }

    public boolean validAuthentification(String email, String password) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email);

        if (utilisateur != null) {
            return password.equals(utilisateur.getPassword());
        }
        return false;
    }
    public Utilisateur getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentEmail = authentication.getName();
        return utilisateurRepository.findByEmail(currentEmail);
    }


}
