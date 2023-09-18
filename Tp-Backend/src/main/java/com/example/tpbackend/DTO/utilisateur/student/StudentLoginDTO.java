package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.utilisateur.LoginUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentLoginDTO {
    private String token;
    private StudentGetDTO studentGetDTO;

    public LoginUser toLoginUser() {
        return new LoginUser(
                token,
                studentGetDTO
        );
    }
}
