package com.example.tpbackend.service;

import com.example.tpbackend.DTO.StudentOfferDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.StudentOffer;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.myExceptions.NotFoundException;
import com.example.tpbackend.myExceptions.UnauthorizedException;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.StudentOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentOfferServiceImpl implements StudentOfferService {

    private final StudentOfferRepository studentOfferRepository;
    private final OffreStageRepository offreRepository;

    @Autowired
    public StudentOfferServiceImpl(StudentOfferRepository studentOfferRepository, OffreStageRepository offreRepository) {
        this.studentOfferRepository = studentOfferRepository;
        this.offreRepository = offreRepository;
    }

    @Override
    public List<StudentOfferDTO> getStudentsByOfferId(Long offerId, Utilisateur user) {
        // Vérification du rôle
        if (!user.getRole().equals("EMPLOYER")) {
            throw new UnauthorizedException("Seuls les employeurs peuvent accéder à cette ressource.");
        }

        // Récupération de l'offre de stage
        OffreStage offre = offreRepository.findById(offerId).orElseThrow(() -> new NotFoundException("Offre non trouvée"));

        // Vérification de l'identité de l'employeur
        if (!offre.getEmployerId().equals(user.getId())) {
            throw new UnauthorizedException("Accès non autorisé à cette offre de stage.");
        }

        // Logique pour récupérer la liste des étudiants ayant postulé
        List<StudentOffer> studentOffers = studentOfferRepository.findOfferById(offerId);

        return studentOffers.stream()
                .map(StudentOfferDTO::fromStudentOffer)
                .collect(Collectors.toList());
    }
}
