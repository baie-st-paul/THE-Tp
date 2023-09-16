package com.example.tpbackend.DTO.utilisateur;

import com.example.tpbackend.models.utilisateur.LoginUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    private String token;
    private String email;

    public LoginUser toLoginUser() {
        return new LoginUser(
                token,
                email
        );
    }
}
