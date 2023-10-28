package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentGetDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String matricule;
    private String program;
    private String tag;

    public static StudentGetDTO fromStudent(Student student) {
        if (student == null) {
            return null;
        }
        String email = (student.getUtilisateur() != null) ? student.getUtilisateur().getEmail() : null;
        return new StudentGetDTO(
                student.getFirstName(),
                student.getLastName(),
                email,
                student.getPhoneNumber(),
                student.getMatricule(),
                student.getProgram(),
                student.getTagName()
        );
    }
}
