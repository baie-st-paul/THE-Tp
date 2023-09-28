package com.example.tpbackend.controllers;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.service.utilisateur.StudentServices;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    StudentServices studentServices;

    @PostMapping(value = "/saveCV", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveCv(@ModelAttribute CvDTO cvDTO) throws IOException {
        try {
            studentServices.saveCv(cvDTO);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(cvDTO);
        } catch (DataIntegrityViolationException e) {
            studentServices.updateCv(cvDTO);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(cvDTO);
        }
    }


    @GetMapping("/getStudentByMatricule/{matricule}")
    public ResponseEntity<StudentGetDTO> getStudentByMatricule(@PathVariable("matricule") String matricule) {
        return  new ResponseEntity<>(studentServices.getStudentByMatricule(matricule), HttpStatus.OK);
    }


}

