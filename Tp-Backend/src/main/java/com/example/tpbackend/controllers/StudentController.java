package com.example.tpbackend.controllers;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.service.utilisateur.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    StudentServices studentServices;
    @Autowired
    StudentController(StudentServices studentServices){
        this.studentServices = studentServices;
    }


    @PostMapping(value = "/saveCV",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> saveCv(@ModelAttribute CvDTO cvDTO) throws IOException {
        studentServices.saveCv(cvDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cvDTO);
    }

}

