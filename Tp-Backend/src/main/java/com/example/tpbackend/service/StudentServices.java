package com.example.tpbackend.service;

import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class StudentServices {

    @Autowired
    private StudentRepository studentRepository;


    public StudentPostDTO saveStudent(String firstName, String lastName, String phoneNumber, String matricule, String program, String email, String password){
        Student student = new Student(email, password, firstName, lastName, phoneNumber, matricule, program);
        studentRepository.save(student);
        return StudentPostDTO.fromStudent(student);
    }



}
