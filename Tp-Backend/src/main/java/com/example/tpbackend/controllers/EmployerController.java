package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.repository.CandidatureRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.utilisateur.LoginService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import com.example.tpbackend.service.utilisateur.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employers")
public class EmployerController {

    private final UserService userService;
    private LoginService loginService;

    private UtilisateurRepository utilisateurRepository;
    private OffreStageRepository offreStageRepository;

    private CandidatureRepository candidatureRepository;
    private OffreStageService offfreStageService;
    private StudentServices studentService;

    private static final Logger logger = LoggerFactory.getLogger(EmployerController.class);

    @Autowired
    public EmployerController(UserService userService, LoginService loginService, UtilisateurRepository utilisateurRepository, OffreStageRepository offreStageRepository, CandidatureRepository candidatureRepository, OffreStageService offfreStageService, StudentServices studentService) {
        this.userService = userService;
        this.loginService = loginService;
        this.utilisateurRepository = utilisateurRepository;
        this.offreStageRepository = offreStageRepository;
        this.candidatureRepository = candidatureRepository;
        this.offfreStageService = offfreStageService;
        this.studentService = studentService;
    }



    @GetMapping("/{offerId}/applicants")
    public ResponseEntity<?> getApplicantsForOffer(@PathVariable Long offerId) {
        logger.info("Recherche des candidats pour l'offre ID: {}", offerId);
        Optional<OffreStageDTO> offreOpt = offfreStageService.getOffreStageById(offerId);

        if(offreOpt.isEmpty()){
            logger.warn("Aucune offre trouvée avec l'ID: {}", offerId);
            return ResponseEntity.status(404).body(Map.of("error", "Aucune offre trouvée avec cet ID."));
        }

        List<CandidatureDTO> candidatures = studentService.getListCandidatureByOfffreId(offerId);

        if(candidatures.isEmpty()){
            logger.warn("Aucune candidature trouvée pour l'offre ID: {}", offerId);
            return ResponseEntity.status(404).body(Map.of("error", "Aucune candidature trouvée pour cette offre."));
        }

        return ResponseEntity.ok(candidatures);
    }





}
