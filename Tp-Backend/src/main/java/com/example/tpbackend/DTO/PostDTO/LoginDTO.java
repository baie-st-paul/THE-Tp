package com.example.tpbackend.DTO.PostDTO;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class LoginDTO {
    private String email;
    private String password;
    private Utilisateur.Roles role;
}
