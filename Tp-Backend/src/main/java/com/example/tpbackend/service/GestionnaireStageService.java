package com.example.tpbackend.service;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.GestionnaireStageRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GestionnaireStageService {

    private GestionnaireStageRepository gestionnaireStageRepository;
    private OffreStageRepository offreStageRepository;
    private CvRepository cvRepository;

    @Autowired
    public GestionnaireStageService(GestionnaireStageRepository gestionnaireStageRepository,
                                    OffreStageRepository offreStageRepository,
                                    CvRepository cvRepository) {
        this.gestionnaireStageRepository = gestionnaireStageRepository;
        this.offreStageRepository = offreStageRepository;
        this.cvRepository = cvRepository;
    }

    public List<OffreStage> getToutesLesOffres() {
        return offreStageRepository.findAll();
    }

    public List<CvDTO> getAllCvs() {
        List<Cv> cvs = cvRepository.findAll();
        List<CvDTO> cvDTOS = new ArrayList<>();

        for (Cv cv: cvs) {
            cvDTOS.add(cv.toCvDTO());
        }
        return cvDTOS;
    }

    public List<CvDTO> getAllCvsByFileName(String fileName) {
        List<Cv> cvs = cvRepository.getAllByFileName(fileName);
        List<CvDTO> cvDTOS = new ArrayList<>();

        for (Cv cv: cvs) {
            cvDTOS.add(cv.toCvDTO());
        }
        return cvDTOS;
    }
}
