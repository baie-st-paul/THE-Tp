package com.example.tpbackend.controllers;


import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.service.OffreStageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stages/offres")

public class OffreStageController {
    private final OffreStageService offreStageService;

    OffreStageController(OffreStageService offreStageService) {
        this.offreStageService = offreStageService;
    }

    @PostMapping
    public ResponseEntity<OffreStage> createOffre(@RequestBody OffreStage offre) {
        OffreStage newOffre = offreStageService.createOffre(offre);
        return new ResponseEntity<>(newOffre, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<OffreStageDTO>> getAllOffres() {
        List<OffreStageDTO> offres = offreStageService.getOffres();
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffreStage> getOffreById(@PathVariable("id") Long id) {
        OffreStage offre = offreStageService.getOffreById(id);
        return new ResponseEntity<>(offre, HttpStatus.OK);
    }


}

