package com.example.tpbackend.DTO.utilisateur.employeur;

import com.example.tpbackend.DTO.utilisateur.employeur.GetDTO.EmployerGetDTO;
import com.example.tpbackend.models.utilisateur.EmployeurLogin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeurLoginDTO {
    private String token;
    private EmployerGetDTO employerGetDTO;

    public EmployeurLogin toEmployeurLogin() {
        return new EmployeurLogin(
                token,
                employerGetDTO
        );
    }
}