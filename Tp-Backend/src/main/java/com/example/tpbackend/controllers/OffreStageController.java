package com.example.tpbackend.controllers;


import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.service.OffreStageService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stages/offres")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class OffreStageController {
    private final OffreStageService offreStageService;

    @PostMapping("/create")
    @PreAuthorize("authenticated")
    public ResponseEntity<OffreStageDTO> createOffre(@RequestBody OffreStageDTO offre) {
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
    public OffreStageDTO updateOffre(@PathVariable("id") long id, @RequestBody OffreStageDTO offre) {
        OffreStageDTO offreStageDTO = offreStageService.getOffreById(id);

        offreStageDTO.setTitre(offre.getTitre());
        offreStageDTO.setSalaire(offre.getSalaire());
        offreStageDTO.setStudentProgram(offre.getStudentProgram());
        offreStageDTO.setDescription(offre.getDescription());
        offreStageDTO.setDateDebut(offre.getDateDebut());
        offreStageDTO.setDateFin(offre.getDateFin());

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

    @GetMapping("/employer/{id}")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<OffreStageDTO>> getOffresByEmployerId(@PathVariable("id") long id) {
        List<OffreStageDTO> offres = offreStageService.getOffresByEmployerId(id);
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("authenticated")
    public ResponseEntity<OffreStageDTO> getOffreById(@PathVariable("id") long id) {
        OffreStageDTO offre = offreStageService.getOffreById(id);
        return new ResponseEntity<>(offre, HttpStatus.OK);
    }
}
