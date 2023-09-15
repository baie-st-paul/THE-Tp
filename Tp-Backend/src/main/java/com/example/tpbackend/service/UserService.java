package com.example.tpbackend.service;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
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
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean validAuthentification(String email, String password) {
        Utilisateur utilisateur = userRepository.findByEmail(email);

        if (utilisateur != null) {
            return password.equals(utilisateur.getPassword());
        }
        return false;
    }
}
