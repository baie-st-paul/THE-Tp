package com.example.tpbackend.models.utilisateur.employeur;

import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;

public record EmployeurLogin(String token, EmployerGetDTO employerGetDTO) {
}
