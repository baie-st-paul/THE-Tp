package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.models.utilisateur.etudiant.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudentGetDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String matricule;
    private String program;

    public StudentGetDTO(String firstName, String lastName, String email, String phoneNumber, String matricule, String program) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.matricule = matricule;
        this.program = program;
    }

    public static StudentGetDTO fromStudent(Student student) {
        if (student == null) {
            return null;
        }

        return new StudentGetDTO(
                student.getUtilisateur().getFirstName(),
                student.getUtilisateur().getLastName(),
                student.getUtilisateur().getEmail(),
                student.getUtilisateur().getPhoneNumber(),
                student.getMatricule(),
                student.getProgram()
        );
    }
}
