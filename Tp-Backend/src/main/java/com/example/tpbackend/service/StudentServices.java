package com.example.tpbackend.service;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
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
    private CvRepository cvRepository;
    @Autowired
    private UserRepository userRepository;

    public StudentPostDTO saveStudent(String firstName,
                                      String lastName,
                                      String phoneNumber,
                                      String matricule,
                                      String program,
                                      String email,
                                      String password,String role){
        Utilisateur utilisateur = new Utilisateur(email, password,role);
        Student student = new Student(
                firstName,lastName,matricule,phoneNumber,program);
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
        Student student = studentPostDTO.toStudent(studentPostDTO);
        studentRepository.save(student);
        return student;
    }

    public CvDTO saveCv(CvDTO cvDTO) throws IOException {
        cvRepository.save(cvDTO.toCv(cvDTO));
        return cvDTO;
    }

    public boolean validAuthentification(String email, String password) {
        Utilisateur utilisateur = userRepository.findByEmail(email);

        if (utilisateur != null) {
            return password.equals(utilisateur.getPassword());
        }
        return false;
    }

    public StudentGetDTO getStudentByUser(UtilisateurDTO utilisateurDTO){
        Student student = studentRepository.findStudentByUtilisateur();
        StudentGetDTO studentGetDTO = new StudentGetDTO(
                student.getFirstName(),student.getLastName(),utilisateurDTO.getEmail(),
                student.getPhoneNumber(),student.getMatricule(),student.getProgram()
        );
        return studentGetDTO;
    }
}
