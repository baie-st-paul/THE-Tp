package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employers")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EmployerController {
    private final OffreStageService offreStageService;
    private final StudentServices studentService;
    private final EmployerService employerService;

    @PostMapping("/candidature/accept/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> acceptCandidature(@PathVariable String matricule, @PathVariable String status) {
        studentService.updateCandidatureStatus(matricule, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getEmployer")
    @PreAuthorize("authenticated")
    public ResponseEntity<EmployerGetDTO> getEmployer() {
        return new ResponseEntity<>(employerService.getEmployerByAuthentication(), HttpStatus.OK);
    }

    @GetMapping("/{offerId}/applicants/nb")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> getApplicantsNumberForOffer(@PathVariable Long offerId) {
        Optional<OffreStageDTO> offreOpt = offreStageService.getOffreStageById(offerId);
        if(offreOpt.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune offre trouvée avec cet ID."));
        }
        List<CandidatureDTO> candidatures = studentService.getListCandidatureByOffreId(offerId);
        return ResponseEntity.ok(candidatures.size());
    }

    @GetMapping("/{offerId}/applicants")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> getApplicantsForOffer(@PathVariable Long offerId) {
        Optional<OffreStageDTO> offreOpt = offreStageService.getOffreStageById(offerId);

        if(offreOpt.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune offre trouvée avec cet ID."));
        }

        List<CandidatureDTO> candidatures = studentService.getListCandidatureByOffreId(offerId);

        if(candidatures.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune candidature trouvée pour cette offre."));
        }
        return ResponseEntity.ok(candidatures);
    }



    @GetMapping("/employer-contracts/{employerId}")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<ContratStageDTO>> getContratsByEmployeur(@PathVariable Long employerId) {
        List<ContratStageDTO> employerContracts = employerService.getContratStageByEmployeur(employerId);
        return ResponseEntity.ok(employerContracts);
    }
}
