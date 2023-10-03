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
@CrossOrigin(origins = "*")
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

    @GetMapping("/")
    public ResponseEntity<List<OffreStageDTO>> getAllOffres() {
        List<OffreStageDTO> offres = offreStageService.getOffres();
        return new ResponseEntity<>(offres, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffreStageDTO> getOffreById(@PathVariable("id") Long id) {
        OffreStageDTO offre = offreStageService.getOffreById(id);
        return new ResponseEntity<>(offre, HttpStatus.OK);
    }


}

