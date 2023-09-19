package com.example.tpbackend.DTO.utilisateur.gestionnaire;

import com.example.tpbackend.models.utilisateur.GestionnaireLogin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GestionnaireLoginDTO {
    private String token;
    private GestionnaireGetDTO gestionnaireGetDTO;

    public GestionnaireLogin toGestionnaireLogin() {
        return new GestionnaireLogin(
                token,
                gestionnaireGetDTO
        );
    }
}
