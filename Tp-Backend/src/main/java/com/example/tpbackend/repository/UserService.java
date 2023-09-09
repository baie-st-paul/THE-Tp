package com.example.tpbackend.repository;

import com.example.tpbackend.DTO.PostDTO.LoginDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Utilisateur findByEmailAndPassword(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Utilisateur createUser(LoginDTO loginDTO) {

        if (userRepository.existsByEmail(loginDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Utilisateur newUser = new Utilisateur();

        newUser.setEmail(loginDTO.getEmail());
        newUser.setPassword(loginDTO.getPassword());
        newUser.setRole(loginDTO.getRole());

        userRepository.save(newUser);

        return newUser;
    }

}
