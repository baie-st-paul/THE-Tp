package com.example.tpbackend.service;

import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UtilisateurRepository utilisateurRepository;

    public UserService(UtilisateurRepository utilisateurRepository){
        this.utilisateurRepository = utilisateurRepository;
    }

    /* pas utilisé
    public Utilisateur createUser(UtilisateurDTO utilisateurDTO) {

        if (userRepository.existsByEmail(utilisateurDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Utilisateur newUser = new Utilisateur();

        newUser.setEmail(utilisateurDTO.getEmail());
        newUser.setPassword(utilisateurDTO.getPassword());

        userRepository.save(newUser);

        return newUser;
    }*/

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
}
