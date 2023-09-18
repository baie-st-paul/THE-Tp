package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.utilisateur.Student;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/stages/student-signup")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    StudentServices studentServices;
    @Autowired
    StudentController(StudentServices studentServices){
        this.studentServices = studentServices;
    }

    @PostMapping("/signup")
    ResponseEntity<?> signup(@RequestBody StudentPostDTO studentPostDTO) {

        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        // validation des entrées de létudiant
        if (studentPostDTO.getFirstName() == null || studentPostDTO.getLastName() == null ||
                studentPostDTO.getMatricule() == null || studentPostDTO.getEmail() == null ||
        !studentPostDTO.getEmail().matches(emailRegex) ||
        studentPostDTO.getPhoneNumber() == null || studentPostDTO.getProgram() == null ||
                studentPostDTO.getPassword() == null || studentPostDTO.getPassword().length() < 6 ||
                studentPostDTO.getPassword().length() > 20) {
            return new ResponseEntity<>("Données invalides", HttpStatus.BAD_REQUEST);}

        if(studentServices.existsByMatriculeOrEmail(studentPostDTO.getMatricule(), studentPostDTO.getEmail())){
            return ResponseEntity.badRequest().body("Matricule ou email existe déjà");
        }

        // logique de la redirection de l'étudiant vers la page d'accueil
        // httpSession session = request.getSession();
        //session.setAttribute("student", studentPostDTO);

        Student student = studentServices.createStudent(studentPostDTO);

        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }

    @PostMapping(value = "/saveCV",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveCv(@ModelAttribute CvDTO cvDTO) throws IOException {
        studentServices.saveCv(cvDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cvDTO);
    }

}

