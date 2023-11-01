package com.example.tpbackend.DTO.utilisateur.student;

import com.example.tpbackend.models.Tag;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.LinkedHashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentPostDTO {
    private String matricule;
    private String program;

    public static StudentPostDTO fromStudent(Student student) {
        StudentPostDTO studentPostDTO = new StudentPostDTO();
        BeanUtils.copyProperties(student, studentPostDTO);
        return studentPostDTO;
    }

    public static StudentPostDTO fromHashMap(LinkedHashMap<?,?> linkedHashMap) {
        StudentPostDTO studentPostDTO = new StudentPostDTO();
        studentPostDTO.setMatricule(linkedHashMap.get("matricule").toString());
        studentPostDTO.setProgram(linkedHashMap.get("program").toString());
        return studentPostDTO;
    }

    public Student toStudent (StudentPostDTO studentPostDTO) {
        Student student = new Student();
        BeanUtils.copyProperties(studentPostDTO, student);
        return student;
    }
}
