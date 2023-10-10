package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.models.utilisateur.etudiant.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

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

    public static StudentGetDTO fromStudent(Student student) {
        if (student == null) {
            return null;
        }

        return new StudentGetDTO(
                student.getFirstName(),
                student.getLastName(),
                student.getUtilisateur().getEmail(),
                student.getPhoneNumber(),
                student.getMatricule(),
                student.getProgram()
        );
    }

    public static Student fromStudentDTO(StudentGetDTO studentGetDTO){
        Student student = new Student();
        BeanUtils.copyProperties(studentGetDTO, student);
        return student;
    }
}
