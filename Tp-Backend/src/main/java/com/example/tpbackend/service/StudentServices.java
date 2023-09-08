package com.example.tpbackend.service;

import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.StudentRepository;
import com.example.tpbackend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServices {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public StudentPostDTO saveStudent(String firstName, String lastName, String phoneNumber, String matricule, String program, String email, String password){
        Utilisateur utilisateur = new Utilisateur(email,password);
        Student student = new Student(email, password, firstName, lastName, phoneNumber, matricule, program);
        student.setUtilisateur(utilisateur);
        System.out.print(utilisateur.getEmail() + utilisateur.getPassword());
        utilisateurRepository.save(utilisateur);
        studentRepository.save(student);
        return StudentPostDTO.fromStudent(student);
    }



}
