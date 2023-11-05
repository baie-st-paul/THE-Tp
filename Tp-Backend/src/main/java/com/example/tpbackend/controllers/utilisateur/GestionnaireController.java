package com.example.tpbackend.controllers.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTODetailed;
import com.example.tpbackend.DTO.entrevue.EntrevueDTODetailed;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.TagDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
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
    @PreAuthorize("authenticated")
    public ResponseEntity<List<EntrevueDTODetailed>> getStudentsWithEntrevue() {
        List<EntrevueDTODetailed> studentDTOS = gestionnaireService.getStudentsWithEntrevue();
        return new ResponseEntity<>(studentDTOS, HttpStatus.OK);
    }

    @PostMapping("/create-contrat")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> createContrat( @RequestBody ContratStageDTO contratStageDTO) {
        try {
            ContratStageDTO newContratStage = gestionnaireService.createContrat(contratStageDTO);
            return new ResponseEntity<>(newContratStage, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/candidatures/acceptees")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<CandidatureDTODetailed>> getCandidaturesAcceptees() {
        List<CandidatureDTODetailed> dtoList = gestionnaireService.getCandidaturesAcceptees();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/getGestionnaire")
    @PreAuthorize("authenticated")
    public ResponseEntity<GestionnaireGetDTO> getGestionnaire() {
        return new ResponseEntity<>(gestionnaireService.getGestionnaireByAuthentication(), HttpStatus.OK);
    }

    @GetMapping("/getSessions")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<TagDTO>> getAllTags() {
        return new ResponseEntity<>(gestionnaireService.getAllTags(), HttpStatus.OK);
    }
}
