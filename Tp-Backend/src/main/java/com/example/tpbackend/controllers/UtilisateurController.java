package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.utilisateur.StudentLoginDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
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
                    dto.getPassword(),
                    "Student"
                    );

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonCreatedStudent = ow.writeValueAsString(dto);

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
    public ResponseEntity<?> loginUtilisateur(@Valid @RequestBody UtilisateurDTO user) {
        if (!userService.existsByEmail(user.getEmail()))  {
            return ResponseEntity
                    .badRequest()
                    .body("Cet utilisateur n'existe pas");
        }

        try {
            boolean valide = userService.validAuthentification(
                    user.getEmail(),
                    user.getPassword());

            if (valide) {
                user = userService.findByEmail(user.getEmail()).toLoginDTO();
                StudentGetDTO studentGetDTO =  studentServices.getStudentByUser(user);

                System.out.println("dtoFindByEmail " + user);
                String token = LoginService.genereJWT(
                        user.getEmail()
                );
                StudentLoginDTO loginDto = new StudentLoginDTO(token,studentGetDTO);
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                String jsonConnectedStudent = ow.writeValueAsString(loginDto.toLoginUser());
                System.out.println(jsonConnectedStudent);
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
