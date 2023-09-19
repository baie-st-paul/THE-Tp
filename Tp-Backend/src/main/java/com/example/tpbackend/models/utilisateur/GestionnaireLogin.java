package com.example.tpbackend.models.utilisateur;


import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;

public record GestionnaireLogin(String token, GestionnaireGetDTO gestionnaireGetDTO) {
}
