package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.models.utilisateur.etudiant.Student;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class StudentPostDTO {
    private String matricule;
    private String program;

    public StudentPostDTO(String matricule, String program) {
        this.matricule = matricule;
        this.program = program;
    }


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
