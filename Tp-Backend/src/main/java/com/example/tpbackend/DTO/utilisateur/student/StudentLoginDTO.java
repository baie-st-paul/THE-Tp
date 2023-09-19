package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.models.utilisateur.StudentLogin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentLoginDTO {
    private String token;
    private StudentGetDTO studentGetDTO;

    public StudentLogin toStudentLogin() {
        return new StudentLogin(
                token,
                studentGetDTO
        );
    }
}
