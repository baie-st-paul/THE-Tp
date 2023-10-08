package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.CandidatureDTO;
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

import java.util.List;
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
        Optional<OffreStageDTO> offreOpt = offfreStageService.getOffreStageById(offerId);

        if(offreOpt.isEmpty()){
            return ResponseEntity.status(404).body("Aucune offre trouvée avec cet ID.");
        }

        List<CandidatureDTO> candidatures = studentService.getListCandidatureByOfffreId(offerId);

        if(candidatures.isEmpty()){
            return ResponseEntity.status(404).body("Aucune candidature trouvée pour cette offre.");
        }

        return ResponseEntity.ok(candidatures);
    }





}
