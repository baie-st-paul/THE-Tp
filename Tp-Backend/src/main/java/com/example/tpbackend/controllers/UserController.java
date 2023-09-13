package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.PostDTO.LoginDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/stages")
@CrossOrigin(origins = "*")

public class UserController {
    private  final UserService userService;

    @Autowired
    UserController (UserService userService){
        this.userService = userService;
    }
    @PostMapping("/login")
    public ResponseEntity<?> connexion(@Valid @RequestBody LoginDTO loginDTO) {

        Utilisateur utilisateur = userService.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());

        if (utilisateur == null || !utilisateur.getRole().equals(loginDTO.getRole())) {
            return new ResponseEntity<>("Invalid email, password, or role", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(utilisateur, HttpStatus.OK);
    }
}
