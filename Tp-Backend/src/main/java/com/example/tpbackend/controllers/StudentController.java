package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.service.utilisateur.StudentServices;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class StudentController {
    private final StudentServices studentServices;

    @PostMapping(value = "/saveCV", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("authenticated")
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
    @PreAuthorize("authenticated")
    public ResponseEntity<StudentGetDTO> getStudentByMatricule(@PathVariable("matricule") String matricule) {
        return  new ResponseEntity<>(studentServices.getStudentByMatricule(matricule), HttpStatus.OK);
    }

    @GetMapping("/getStudent")
    @PreAuthorize("authenticated")
    public ResponseEntity<StudentGetDTO> getStudentByMatricule() {
        return  new ResponseEntity<>(studentServices.getStudentByAuthentication(), HttpStatus.OK);
    }

    @PostMapping(value = "/postuler", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("authenticated")
    public ResponseEntity<?> postuler(@ModelAttribute CandidaturePostDTO candidaturePostDTO){
        try {
            studentServices.postulerOffre(candidaturePostDTO);
            return ResponseEntity.accepted().body(candidaturePostDTO);
        } catch (DataAccessException | IOException ex) {
            String errorMessage = "An error occurred while processing your request";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @GetMapping(value = "/getMesCandidatures/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> getCandidatures(@PathVariable("matricule") String matricule){
        try {
            List<CandidatureGetDTO> candidatureGetDTOList =  studentServices.getMesCandidaturesByMatricule(matricule);
            return ResponseEntity.accepted().body(candidatureGetDTOList);
        } catch (DataAccessException ex) {
            String errorMessage = "An error occurred while processing your request";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }
}

