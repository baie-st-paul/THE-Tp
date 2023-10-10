package com.example.tpbackend.controllers;


import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.service.OffreStageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/offres")
@CrossOrigin(origins = "http://localhost:3000")
public class OffreStageController {
    private final OffreStageService offreStageService;

    @PostMapping("/create")
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
    public OffreStageDTO updateOffre(@PathVariable("id") long id, @RequestBody OffreStageDTO offre) {
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
    public void deleteOffre(@PathVariable long id) {
        offreStageService.deleteOffreStage(id);
    }

    @GetMapping("/")
    public ResponseEntity<List<OffreStageDTO>> getAllOffres() {
        List<OffreStageDTO> offres = offreStageService.getOffres();
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/employer/{id}")
    public ResponseEntity<List<OffreStageDTO>> getOffresByEmployerId(@PathVariable("id") long id) {
        List<OffreStageDTO> offres = offreStageService.getOffresByEmployerId(id);
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffreStageDTO> getOffreById(@PathVariable("id") long id) {
        OffreStageDTO offre = offreStageService.getOffreById(id);
        return new ResponseEntity<>(offre, HttpStatus.OK);
    }
}
