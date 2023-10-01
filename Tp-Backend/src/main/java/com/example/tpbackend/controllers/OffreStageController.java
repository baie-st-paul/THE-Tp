package com.example.tpbackend.controllers;


import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.service.OffreStageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/stages/offres")
@CrossOrigin(origins = "http://localhost:3000")
public class OffreStageController {
    private final OffreStageService offreStageService;

    @PostMapping
    public ResponseEntity<OffreStageDTO> createOffre(@RequestBody OffreStageDTO offre) {
        try {
            OffreStageDTO newOffre = offreStageService.createOffre(offre);
            return new ResponseEntity<>(newOffre, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<OffreStageDTO> updateOffre(@PathVariable("id") Long id, @RequestBody OffreStageDTO offre) {
        OffreStageDTO offreData = offreStageService.updateOffreStage(id, offre);
        if (offreData != null) {
            return new ResponseEntity<>(offreData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOffre(@PathVariable("id") Long id) {
        try {
            offreStageService.deleteOffreStage(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<OffreStageDTO>> getAllOffres() {
        List<OffreStageDTO> offres = offreStageService.getOffres();
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/employer/{id}")
    public ResponseEntity<List<OffreStageDTO>> getOffresByEmployerId(@PathVariable("id") Long id) {
        List<OffreStageDTO> offres = offreStageService.getOffresByEmployerId(id);
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffreStageDTO> getOffreById(@PathVariable("id") Long id) {
        OffreStageDTO offre = offreStageService.getOffreById(id);
        return new ResponseEntity<>(offre, HttpStatus.OK);
    }


}

