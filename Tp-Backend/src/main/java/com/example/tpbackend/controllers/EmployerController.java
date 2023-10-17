package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/employers")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployerController {
    private OffreStageService offreStageService;
    private StudentServices studentService;

    @GetMapping("/{offerId}/applicants")
    public ResponseEntity<?> getApplicantsForOffer(@PathVariable Long offerId) {
        Optional<OffreStageDTO> offreOpt = offreStageService.getOffreStageById(offerId);

        if(offreOpt.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune offre trouvée avec cet ID."));
        }

        List<CandidatureDTO> candidatures = studentService.getListCandidatureByOfffreId(offerId);

        if(candidatures.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune candidature trouvée pour cette offre."));
        }
        return ResponseEntity.ok(candidatures);
    }

}
