package com.example.tpbackend.DTO.PostDTO;

import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class StudentPostDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String matricule;
    private String program;
    private Utilisateur.Roles role;

    public StudentPostDTO(String email,
                          String password,
                          String firstName,
                          String lastName,
                          String phoneNumber,
                          String matricule,
                          String program,
                          Utilisateur.Roles role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.matricule = matricule;
        this.program = program;
        this.role = role;

    }

    public static StudentPostDTO fromStudent(Student student) {
        StudentPostDTO studentPostDTO = new StudentPostDTO();
        BeanUtils.copyProperties(student, studentPostDTO);
        return studentPostDTO;
    }

    public Student fromStudentDTO (StudentPostDTO studentPostDTO) {
        Student student = new Student();
        BeanUtils.copyProperties(studentPostDTO, student);
        return student;
    }

    public Student toStudent() {
        return new Student(
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                matricule,
                program,
                new Utilisateur(email, password, role)
        );
    }
}
