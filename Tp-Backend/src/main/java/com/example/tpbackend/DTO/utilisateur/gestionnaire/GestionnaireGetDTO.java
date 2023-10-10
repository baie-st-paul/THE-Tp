package com.example.tpbackend.DTO.utilisateur.gestionnaire;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GestionnaireGetDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String matricule;
}

