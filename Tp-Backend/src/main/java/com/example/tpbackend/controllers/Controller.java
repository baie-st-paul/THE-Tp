package com.example.tpbackend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.example.tpbackend.DTO.PostDTO.StudentPostDTO;
import com.example.tpbackend.service.StudentServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/stages") // v1 = version 1
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor

public class Controller {
    private final StudentServices studentServices;

    @PostMapping(value = "/newStudent")
    public ResponseEntity<?> createStudent(@Valid @RequestBody StudentPostDTO dto) {
        if(studentServices.existsByMatriculeOrEmail(dto.getMatricule(), dto.getEmail())){
            return ResponseEntity.badRequest().body("Matricule ou email existe déjà");
        }

        try {
            dto = studentServices.saveStudent(
                    dto.getFirstName(),
                    dto.getLastName(),
                    dto.getPhoneNumber(),
                    dto.getMatricule(),
                    dto.getProgram(),
                    dto.getEmail(),
                    dto.getPassword());

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonCreatedUser = ow.writeValueAsString(dto.toStudent());

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(jsonCreatedUser);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
