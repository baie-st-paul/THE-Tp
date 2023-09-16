package com.example.tpbackend.DTO.utilisateur;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UtilisateurDTO {
    private String email;
    private String password;

    public Utilisateur toUtilisateur() {
        return new Utilisateur(
                email,
                password
        );
    }
}
