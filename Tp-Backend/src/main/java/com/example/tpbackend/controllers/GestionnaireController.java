package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.EntrevueDTODetailed;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/gestionnaire")
@CrossOrigin(origins = "http://localhost:3000")
public class GestionnaireController {
    private GestionnaireService gestionnaireService;

    @GetMapping("/offres")
    public List<OffreStageDTO> getToutesLesOffres() {
        return gestionnaireService.getToutesLesOffres();
    }

    @PostMapping("/offres/accept/{titre}/{status}")
    public ResponseEntity<Void> acceptOffre(@PathVariable String titre,@PathVariable String status) {
        gestionnaireService.updateOffreStatus(titre,status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/cvs")
    public ResponseEntity<List<CvDTO>> getAllCvs() {
        return ResponseEntity.ok(gestionnaireService.getAllCvs());
    }

    @PostMapping("/cvs/accept/{matricule}/{status}")
    public ResponseEntity<Void> acceptCv(@PathVariable String matricule,@PathVariable String status) {
        gestionnaireService.updateCvStatus(matricule,status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/studentsWithEntrevue")
    public ResponseEntity<List<EntrevueDTODetailed>> getStudentsWithEntrevue() {
        List<EntrevueDTODetailed> studentDTOS = gestionnaireService.getStudentsWithEntrevue();
        return new ResponseEntity<>(studentDTOS, HttpStatus.OK);
    }
}
