package com.example.tpbackend.service.dashboard;

import com.example.tpbackend.models.*;
import com.example.tpbackend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class  DashboardUpdateStatus {
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
    public void updateStatusCvVuG(String matricule, Cv.StatusVuPasVu status) {
        cvRepository.updateCvStatusVuPasVuGByMatricule(matricule, status);
    }

    @Transactional
    public void updateStatusOffreVuG(String titre, OffreStage.StatusVuPasVu statusOffre) {
        offreStageRepository.updateOffreStatusVuPasVuGByTitre(titre, statusOffre);
    }

    @Transactional
    public void updateStatusEntrevueVuG(String matricule, Entrevue.StatusVuPasVu statusEntrevue) {
        entrevueRepository.updateStatusVuPasVuGByMatricule(matricule, statusEntrevue);
    }

    @Transactional
    public void updateStatusCandidatureEmbaucheVuG(String matricule, Candidature.StatusVuPasVu statusCandidature) {
        candidatureRepository.updateCandidatureStatusVuPasVuGByMatricule(matricule, statusCandidature);
    }

    @Transactional
    public void updateStatusContratVuG(String matricule, ContratStage.StatusVuPasVu statusContrat) {
        contratStageRepository.updateStatusVuPasVuGByMatricule(matricule, statusContrat);
    }
}
