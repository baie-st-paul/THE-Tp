package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.service.utilisateur.GestionnaireService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/gestionnaire")
public class GestionnaireController {
    private GestionnaireService gestionnaireService;

    @GetMapping("/offres")
    public List<OffreStage> getToutesLesOffres() {
        return gestionnaireService.getToutesLesOffres();
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
}
