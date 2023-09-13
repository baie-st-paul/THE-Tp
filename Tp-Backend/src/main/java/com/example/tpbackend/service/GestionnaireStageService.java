package com.example.tpbackend.service;

import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.GestionnaireStageRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GestionnaireStageService {

    private final GestionnaireStageRepository gestionnaireStageRepository;

    private final OffreStageRepository offreStageRepository;

    @Autowired
    public GestionnaireStageService(GestionnaireStageRepository gestionnaireStageRepository,
                                    OffreStageRepository offreStageRepository) {
        this.gestionnaireStageRepository = gestionnaireStageRepository;
        this.offreStageRepository = offreStageRepository;
    }

    public List<OffreStage> getToutesLesOffres() {
        return offreStageRepository.findAll();
    }



}

