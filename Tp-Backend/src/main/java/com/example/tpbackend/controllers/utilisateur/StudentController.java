package com.example.tpbackend.controllers.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.OffreStage;
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

    @PostMapping("/update/offre/{titre}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusOffreVuS(@PathVariable String titre, @PathVariable String status) {
        studentServices.updateStatusOffreVuS(titre, OffreStage.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/entrevue/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusEntrevueVuS(@PathVariable String matricule, @PathVariable String status) {
        studentServices.updateStatusEntrevueVuS(matricule, Entrevue.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/contrat/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusContratVuS(@PathVariable String matricule, @PathVariable String status) {
        studentServices.updateStatusContratVuS(matricule, ContratStage.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getStudentByMatricule/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<StudentGetDTO> getStudentByMatricule(@PathVariable("matricule") String matricule) {
        return  new ResponseEntity<>(studentServices.getStudentByMatricule(matricule), HttpStatus.OK);
    }

    @GetMapping("/getstudent")
    @PreAuthorize("authenticated")
    public ResponseEntity<StudentGetDTO> getStudent() {
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

    @GetMapping("/getSessions/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<Object>> checkCurrentSession(@PathVariable("matricule") String matricule) {
        List<Object> result = studentServices.checkCurrentSession(matricule);
        System.out.println(result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping("/reinscriptionANouvelleSession/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> reinscriptionANouvelleSession(@PathVariable("matricule") String matricule) {
        try {
            studentServices.reinscriptionANouvelleSession(matricule);
            return ResponseEntity.ok("Reinscription to a new session for student with matricule " + matricule + " has been completed.");
        } catch (Exception ex) {
            String errorMessage = "An error occurred while processing your request";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @GetMapping("/getCvByMatricule/{matricule}")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> getCvByMatricule(@PathVariable("matricule") String matricule) {
        try {
            CvDTO cvDTO = studentServices.getCvByMatricule(matricule);
            return ResponseEntity.ok(cvDTO);
        } catch (Exception ex) {
            String errorMessage = "No cv found for student with matricule " + matricule + " has been completed.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
    }

    @GetMapping("/student-contracts/{studentId}")
    public ResponseEntity<?> getContratsByStudent(@PathVariable("studentId") String  studentId) {
        try {
            List<ContratStageDTO> studentContracts = studentServices.getContratByStudent(studentId);
            return ResponseEntity.ok(studentContracts);
        } catch (Exception ex) {
            String errorMessage = "Une erreur est survenue lors du traitement de votre requête";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @PostMapping("/signerContrat")
    @PreAuthorize("authenticated")
    public ResponseEntity<ContratStageDTO> signContract(@RequestBody ContratStageDTO contratStageDTO) {
        try {
            studentServices.signContract(contratStageDTO);
            return ResponseEntity.ok(contratStageDTO);
        } catch (Exception ex) {
            String errorMessage = "Le contrat n'a pas pu être signé par l'étudiant";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

