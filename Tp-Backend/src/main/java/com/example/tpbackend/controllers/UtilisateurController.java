package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.Authentication.JwtAuthenticationResponse;
import com.example.tpbackend.DTO.Authentication.LoginRequest;
import com.example.tpbackend.DTO.Authentication.RegisterRequest;
import com.example.tpbackend.service.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/utilisateur") // v1 = version 1
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UtilisateurController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.register(request));
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.login(request));
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

}
