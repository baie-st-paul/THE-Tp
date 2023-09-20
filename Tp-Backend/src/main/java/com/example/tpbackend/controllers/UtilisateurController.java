package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.utilisateur.employeur.EmployeurLoginDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireLoginDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentLoginDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerPostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.service.utilisateur.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
    private EmployerService employerService;
    private GestionnaireService gestionnaireService;
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
                    dto,
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

    @PostMapping(value = "/newEmployer")
    public ResponseEntity<?> createEmployer(@Valid @RequestBody EmployerPostDTO dto){
        if (employerService.existByEmail(dto.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Company id ou email existe déjà");
        }

        try {
            dto = employerService.saveEmployer(dto,dto.getEmail(),dto.getPassword(),"Employeur");

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonCreatedUser = ow.writeValueAsString(dto.toEmployer(dto));

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(jsonCreatedUser);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping(value = "/newAdmin")
    public ResponseEntity<?> createGestionnaire(@Valid @RequestBody GestionnairePostDTO adminDTO) {
        if (gestionnaireService.existsByMatriculeOrEmail(adminDTO.getMatricule(), adminDTO.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Matricule ou email existe déjà");
        }

        try{
            adminDTO = gestionnaireService.saveGestionnaire(
                    adminDTO.getFirstName(),
                    adminDTO.getLastName(),
                    adminDTO.getPhoneNumber(),
                    adminDTO.getMatricule(),
                    adminDTO.getEmail(),
                    adminDTO.getPassword(),
                    "Gestionnaire"
            );

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            String jsonCreatedStudent = ow.writeValueAsString(adminDTO);

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
        if (!userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Cet utilisateur n'existe pas");
        }

        try {
            boolean isValidAuthentication = userService.validAuthentification(
                    user.getEmail(),
                    user.getPassword()
            );

            if (isValidAuthentication) {
                user = userService.findByEmail(user.getEmail()).toLoginDTO();

                String token = LoginService.genereJWT(user.getEmail());
                String jsonResponse= "";
                switch (user.getRole()){

                    case "Student":
                        StudentGetDTO studentGetDTO = studentServices.getStudentByUser(user);
                        StudentLoginDTO loginDtoS = new StudentLoginDTO(token, studentGetDTO);
                        jsonResponse = convertObjectToJson(loginDtoS.toStudentLogin(),user.getRole());
                        System.out.println(jsonResponse);
                        break;
                    case "Gestionnaire":
                        GestionnaireGetDTO gestionnaireGetDTO = gestionnaireService.getGestionnaireByUser(user);
                        GestionnaireLoginDTO loginDtoG = new GestionnaireLoginDTO(token, gestionnaireGetDTO);
                        jsonResponse = convertObjectToJson(loginDtoG.toGestionnaireLogin(),user.getRole());
                        break;
                    case "Employeur":
                        EmployerGetDTO employerGetDTO = employerService.getEmployeurByUser(user);
                        EmployeurLoginDTO loginDtoE = new EmployeurLoginDTO(token, employerGetDTO);
                        jsonResponse = convertObjectToJson(loginDtoE.toEmployeurLogin(),user.getRole());
                        break;
                }
                return ResponseEntity.accepted().body(jsonResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe incorrect");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



    private String convertObjectToJson(Object object, String userType) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectWriter objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
        ObjectNode rootNode = objectMapper.createObjectNode();
        rootNode.put("user_type", userType);
        rootNode.set("data", objectMapper.valueToTree(object));
        return objectWriter.writeValueAsString(rootNode);
    }



}
