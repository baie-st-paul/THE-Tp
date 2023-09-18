package com.example.tpbackend.DTO.utilisateur.student;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudentGetDTO {
    public StudentGetDTO(String firstName, String lastName, String email, String phoneNumber, String matricule, String program) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.matricule = matricule;
        this.program = program;
    }

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String matricule;
    private String program;
}
