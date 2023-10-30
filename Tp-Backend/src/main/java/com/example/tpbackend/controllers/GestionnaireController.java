package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.EntrevueDTODetailed;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/gestionnaire")
@RequiredArgsConstructor
public class GestionnaireController {
    private final GestionnaireService gestionnaireService;

    @GetMapping("/offres")
    @PreAuthorize("authenticated")
    public List<OffreStageDTO> getToutesLesOffres() {
        return gestionnaireService.getToutesLesOffres();
    }

    @PostMapping("/offres/accept/{titre}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> acceptOffre(@PathVariable String titre,@PathVariable String status) {
        gestionnaireService.updateOffreStatus(titre,status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/cvs")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<CvDTO>> getAllCvs() {
        return ResponseEntity.ok(gestionnaireService.getAllCvs());
    }

    @PostMapping("/cvs/accept/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> acceptCv(@PathVariable String matricule,@PathVariable String status) {
        gestionnaireService.updateCvStatus(matricule,status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/studentsWithEntrevue")
    public ResponseEntity<List<EntrevueDTODetailed>> getStudentsWithEntrevue() {
        List<EntrevueDTODetailed> studentDTOS = gestionnaireService.getStudentsWithEntrevue();
        return new ResponseEntity<>(studentDTOS, HttpStatus.OK);
    }

    @GetMapping("/getGestionnaire")
    @PreAuthorize("authenticated")
    public ResponseEntity<GestionnaireGetDTO> getGestionnaire() {
        return new ResponseEntity<>(gestionnaireService.getGestionnaireByAuthentication(), HttpStatus.OK);
    }
}
