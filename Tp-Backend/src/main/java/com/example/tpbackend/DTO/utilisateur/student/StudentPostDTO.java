package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentPostDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String matricule;
    private String program;

    public static StudentPostDTO fromStudent(Student student) {
        StudentPostDTO studentPostDTO = new StudentPostDTO();
        BeanUtils.copyProperties(student, studentPostDTO);
        return studentPostDTO;
    }

    public Student toStudent (StudentPostDTO studentPostDTO) {
        Student student = new Student();
        BeanUtils.copyProperties(studentPostDTO, student);
        return student;
    }
}
