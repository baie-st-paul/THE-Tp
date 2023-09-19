package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class StudentServices {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private CvRepository cvRepository;

    public StudentPostDTO saveStudent(StudentPostDTO studentPostDTO, String email, String password, String role){
        Utilisateur utilisateur = new Utilisateur(email, password,role);
        Student student = studentPostDTO.toStudent(studentPostDTO);
        student.setUtilisateur(utilisateur);
        utilisateurRepository.save(utilisateur);
        studentRepository.save(student);
        return StudentPostDTO.fromStudent(student);
    }

    public boolean existsByMatriculeOrEmail(String matricule, String email){
        return studentRepository.existsByMatriculeOrEmail(matricule, email);
    }

    public CvDTO saveCv(CvDTO cvDTO) throws IOException {
        cvRepository.save(cvDTO.toCv());
        return cvDTO;
    }

    public CvDTO updateCv(CvDTO cvDTO) throws IOException{
        cvRepository.updateCvWhenStudentHaveCv(cvDTO.getMatricule(),cvDTO.getFileName(),cvDTO.toCv().getFile_cv(),cvDTO.toCv().getStatus());
        return cvDTO;
    }

    public StudentGetDTO getStudentByUser(UtilisateurDTO utilisateurDTO){
        Student student = studentRepository.findStudentByUtilisateur();
        StudentGetDTO studentGetDTO = new StudentGetDTO(
                student.getFirstName(),student.getLastName(),utilisateurDTO.getEmail(),
                student.getPhoneNumber(),student.getMatricule(),student.getProgram()
        );
        return studentGetDTO;
    }

    public StudentGetDTO getStudentByMatricule(String matricule) {
        Student student = studentRepository.findByMaticule(matricule);
        System.out.println(student);
        return student.fromStudent(student);
    }
}
