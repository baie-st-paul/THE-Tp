package com.example.tpbackend.service;

import com.example.tpbackend.DTO.PostDTO.CvDTO;
import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.StudentRepository;
import com.example.tpbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class StudentServices {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository utilisateurRepository;
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private UserRepository userRepository;

    public StudentPostDTO saveStudent(String firstName,
                                      String lastName,
                                      String phoneNumber,
                                      String matricule,
                                      String program,
                                      String email,
                                      String password,
                                      Utilisateur.Roles role){
        Utilisateur utilisateur = new Utilisateur(email, password, Utilisateur.Roles.STUDENT);
        Student student = new Student(email,
                password,
                firstName,
                lastName,
                phoneNumber,
                matricule,
                program,
                utilisateur);
        student.setUtilisateur(utilisateur);
        System.out.print(utilisateur.getEmail() + utilisateur.getPassword());
        userRepository.save(utilisateur);
        studentRepository.save(student);

        return StudentPostDTO.fromStudent(student);
    }

    public boolean existsByMatriculeOrEmail(String matricule, String email){
        return studentRepository.existsByMatriculeOrEmail(matricule, email);
    }

    public Student createStudent(StudentPostDTO studentPostDTO){
        Student student = studentPostDTO.fromStudentDTO(studentPostDTO);
        studentRepository.save(student);
        return student;
    }

    public CvDTO saveCv(CvDTO cvDTO) throws IOException {
        cvRepository.save(cvDTO.toCv(cvDTO));
        return cvDTO;
    }

}
