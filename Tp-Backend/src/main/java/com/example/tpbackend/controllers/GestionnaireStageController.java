package com.example.tpbackend.controllers;

import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.service.GestionnaireStageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gestionnaire")
public class GestionnaireStageController {

    @Autowired
    private GestionnaireStageService gestionnaireStageService;

    @GetMapping("/offres")
    public List<OffreStage> getToutesLesOffres() {
        return gestionnaireStageService.getToutesLesOffres();
    }


}

