package com.example.tpbackend.service;

import com.example.tpbackend.DTO.LoginDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public boolean findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Utilisateur createUser(LoginDTO loginDTO) {

        if (userRepository.existsByEmail(loginDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Utilisateur newUser = new Utilisateur();

        newUser.setEmail(loginDTO.getEmail());
        newUser.setPassword(loginDTO.getPassword());

        userRepository.save(newUser);

        return newUser;
    }

    public Utilisateur findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean validAuthentification(String email, String password) {
        Utilisateur utilisateur = userRepository.findByEmail(email);

        if (utilisateur != null) {
            return password.equals(utilisateur.getPassword());
        }
        return false;
    }


}
