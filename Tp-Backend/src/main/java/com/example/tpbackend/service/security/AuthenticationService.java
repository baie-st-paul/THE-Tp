package com.example.tpbackend.service.security;

import com.example.tpbackend.DTO.Authentication.JwtAuthenticationResponse;
import com.example.tpbackend.DTO.Authentication.LoginRequest;
import com.example.tpbackend.DTO.Authentication.RegisterRequest;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import com.example.tpbackend.service.utilisateur.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final EmployerService employerService;
    private final GestionnaireService gestionnaireService;
    private final StudentServices studentServices;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public JwtAuthenticationResponse register(RegisterRequest<?> request) {
        var user = Utilisateur.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Utilisateur.Role.valueOf(request.getRole())).build();

        switch (request.getRole()) {
            case "Employeur":
                employerService.saveEmployer(
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getPassword(),
                        user.getAuthorities().iterator().next().getAuthority(),
                        EmployerPostDTO.fromHashMap((LinkedHashMap<?,?>) request.getUserType())
                );
                break;
            case "Gestionnaire":
                gestionnaireService.saveGestionnaire(
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getPassword(),
                        user.getAuthorities().iterator().next().getAuthority(),
                        GestionnairePostDTO.fromHashMap((LinkedHashMap<?,?>) request.getUserType())
                );
                break;
            case "Student":
                studentServices.saveStudent(
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getPassword(),
                        user.getAuthorities().iterator().next().getAuthority(),
                        StudentPostDTO.fromHashMap((LinkedHashMap<?,?>) request.getUserType())
                );
                break;
        }
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .role(user.getAuthorities().iterator().next().getAuthority())
                .build();
    }

    public JwtAuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userService.userDetailsService().loadUserByUsername(request.getEmail());
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .role(user.getAuthorities().iterator().next().getAuthority())
                .build();
    }

}
