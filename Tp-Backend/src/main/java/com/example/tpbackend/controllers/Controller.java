package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.PostDTO.LoginDTO;
import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.service.StudentServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages") // v1 = version 1
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
    private StudentServices studentServices;

    @PostMapping("/newStudent")
    public ResponseEntity<?> createStudent(@Valid @RequestBody StudentPostDTO dto) {
        if (studentServices.existsByMatriculeOrEmail(dto.getMatricule(), dto.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Matricule ou email existe déjà");
        }

        try {
            dto = studentServices.saveStudent(
                    dto.getFirstName(),
                    dto.getLastName(),
                    dto.getPhoneNumber(),
                    dto.getMatricule(),
                    dto.getProgram(),
                    dto.getEmail(),
                    dto.getPassword(),
                    dto.getRole());

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonCreatedStudent = ow.writeValueAsString(dto.toStudent());

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(jsonCreatedStudent);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/loginStudent")
    public ResponseEntity<?> loginStudent(@Valid @RequestBody StudentPostDTO dto) {
        if (!studentServices.existsByMatriculeOrEmail(dto.getMatricule(), dto.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Cet élève n'existe pas");
        }

        try {
            boolean valide = studentServices.validAuthentification(
                    dto.getEmail(),
                    dto.getPassword());

            if (valide) {

                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String jsonConnectedStudent = ow.writeValueAsString(dto.toStudent());

                return ResponseEntity
                        .accepted()
                        .body(jsonConnectedStudent);
            } else {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Mot de passe invalide");
            }
        } catch(Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
