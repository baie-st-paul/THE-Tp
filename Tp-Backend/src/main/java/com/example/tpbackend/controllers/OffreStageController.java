package com.example.tpbackend.controllers;


import com.example.tpbackend.DTO.EvaluationMilieuStageDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.custom_exceptions.OffreNotFoundException;
import com.example.tpbackend.service.OffreStageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/stages/offres")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class OffreStageController {
    private final OffreStageService offreStageService;

    @PostMapping("/create")
    @PreAuthorize("authenticated")
    public ResponseEntity<OffreStageDTO> saveOffre(@Valid @RequestBody OffreStageDTO offre) {
        try {
            OffreStageDTO newOffre = offreStageService.saveOffre(offre);
            return new ResponseEntity<>(newOffre, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(offre);
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("authenticated")
    public OffreStageDTO updateOffre(@PathVariable("id") long id, @RequestBody OffreStageDTO offre){
        OffreStageDTO offreStageDTO = offreStageService.getOffreById(id);
        offreStageDTO.setTitre(offre.getTitre());
        offreStageDTO.setSalaire(offre.getSalaire());
        offreStageDTO.setStudentProgram(offre.getStudentProgram());
        offreStageDTO.setDescription(offre.getDescription());
        offreStageDTO.setDateDebut(offre.getDateDebut());
        offreStageDTO.setDateFin(offre.getDateFin());
        offreStageDTO.setNbMaxEtudiants(offre.getNbMaxEtudiants());

        return offreStageService.saveOffre(offreStageDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("authenticated")
    public void deleteOffre(@PathVariable long id) {
        offreStageService.deleteOffreStage(id);
    }

    @GetMapping("/")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<OffreStageDTO>> getAllOffres() {
        List<OffreStageDTO> offres = offreStageService.getOffres();
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/employer")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<OffreStageDTO>> getOffresByEmployerId() {
        List<OffreStageDTO> offres = offreStageService.getOffresByEmployerId();
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("authenticated")
    public ResponseEntity<OffreStageDTO> getOffreById(@PathVariable("id") long id) {
        try {
            OffreStageDTO offre = offreStageService.getOffreById(id);
            return new ResponseEntity<>(offre, HttpStatus.OK);
        } catch (OffreNotFoundException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/{id}/evaluation", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("authenticated")
    public ResponseEntity<?> addEvaluation(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        try {
            EvaluationMilieuStageDTO evaluationMilieuStageDTO = new EvaluationMilieuStageDTO(file);
            OffreStageDTO response = offreStageService.saveEvaluationMilieuStage(evaluationMilieuStageDTO, id);
            String message = String.format("Fichier '%s' reçu et sauvegardé.", response.getEvaluationMilieuStage().getName());
            return ResponseEntity.ok(message);

        } catch (OffreNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file");
        }
    }
}
