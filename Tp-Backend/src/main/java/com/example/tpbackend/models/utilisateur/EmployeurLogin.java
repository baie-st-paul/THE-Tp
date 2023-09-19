package com.example.tpbackend.models.utilisateur;

import com.example.tpbackend.DTO.utilisateur.employeur.GetDTO.EmployerGetDTO;

public record EmployeurLogin(String token, EmployerGetDTO employerGetDTO) {
}
