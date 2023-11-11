package com.example.tpbackend.service.dashboard;

import com.example.tpbackend.models.*;
import com.example.tpbackend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardUpdateStatus {
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private OffreStageRepository offreStageRepository;
    @Autowired
    private EntrevueRepository entrevueRepository;
    @Autowired
    private CandidatureRepository candidatureRepository;
    @Autowired
    private ContratStageRepository contratStageRepository;

    @Transactional
    public void updateStatusCvVuG(String matricule, Cv.StatusCV statusCV) {
        cvRepository.updateCvStatusByMatricule(matricule, statusCV);
    }

    @Transactional
    public void updateStatusOffreVuG(String titre, OffreStage.Status statusOffre) {
        offreStageRepository.updateOffreStatusByTitre(titre, statusOffre);
    }

    @Transactional
    public void updateStatusEntrevueVuG(String matricule, Entrevue.Status statusEntrevue) {
        entrevueRepository.updateStatusByMatricule(matricule, statusEntrevue);
    }

    @Transactional
    public void updateStatusCandidatureEmbaucheVuG(String matricule, Candidature.Status statusCandidature) {
        candidatureRepository.updateCandidatureStatusByMatricule(matricule, statusCandidature);
    }

    @Transactional
    public void updateStatusContratVuG(String matricule, ContratStage.Statut statutContrat) {
        contratStageRepository.updateStatusByMatricule(matricule, statutContrat);
    }
}
