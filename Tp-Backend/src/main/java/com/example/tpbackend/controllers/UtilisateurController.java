package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.Authentication.JwtAuthenticationResponse;
import com.example.tpbackend.DTO.Authentication.LoginRequest;
import com.example.tpbackend.DTO.Authentication.RegisterRequest;
import com.example.tpbackend.service.security.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/utilisateur") // v1 = version 1
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UtilisateurController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

}
