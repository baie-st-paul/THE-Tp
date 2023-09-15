package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.LoginDTO;
import com.example.tpbackend.DTO.UtilisateurDTO;
import com.example.tpbackend.DTO.StudentPostDTO;
import com.example.tpbackend.service.LoginService;
import com.example.tpbackend.service.StudentServices;
import com.example.tpbackend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/utilisateur") // v1 = version 1
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {

    private StudentServices studentServices;
    private UserService userService;

    @PostMapping(value = "/newStudent")
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
                    dto.getPassword()
                    );

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

    @PostMapping(value = "/loginUtilisateur")
    public ResponseEntity<?> loginUtilisateur(@Valid @RequestBody UtilisateurDTO dto) {
        if (!userService.existsByEmail(dto.getEmail()))  {
            return ResponseEntity
                    .badRequest()
                    .body("Cet utilisateur n'existe pas");
        }

        try {
            boolean valide = userService.validAuthentification(
                    dto.getEmail(),
                    dto.getPassword());

            if (valide) {
                dto = userService.findByEmail(dto.getEmail()).toLoginDTO();
                System.out.println("dtoFindByEmail " + dto);
                String token = LoginService.genereJWT(
                        dto.getEmail()
                );
                LoginDTO loginDto = new LoginDTO(token, dto.getEmail());
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String jsonConnectedStudent = ow.writeValueAsString(loginDto.toLoginUser());

                return ResponseEntity
                        .accepted()
                        .body(jsonConnectedStudent);
            } else {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("Mot de passe incorrect");
            }
        } catch(Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
