package com.example.tpbackend.service.security;

import com.example.tpbackend.DTO.Authentication.JwtAuthenticationResponse;
import com.example.tpbackend.DTO.Authentication.SignInRequest;
import com.example.tpbackend.DTO.Authentication.SignUpRequest;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import com.example.tpbackend.service.utilisateur.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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




    public JwtAuthenticationResponse signup(SignUpRequest request){
        var user = Utilisateur.builder().firstName(request.getFirstName()).lastName(request.getLastName())
                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
                .role(Utilisateur.Role.valueOf(request.getRole())).build();

        switch (request.getRole()) {
            case "EMPLOYER":
                employerService.saveEmployer(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.getRole(),
                        (EmployerPostDTO) request.getUserType()
                );
                break;
            case "GESTIONNAIRE":
                gestionnaireService.saveGestionnaire(request);
                break;
            case "STUDENT":
                studentServices.saveStudent(request);
                break;
        }

        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    public JwtAuthenticationResponse signin(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userService.loadUserByEmail(request.getEmail());
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

}
