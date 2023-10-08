package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.utilisateur.LoginService;
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

    @Autowired
    public EmployerController(UserService userService, LoginService loginService, UtilisateurRepository utilisateurRepository, OffreStageRepository offreStageRepository) {
        this.userService = userService;
        this.loginService = loginService;
        this.utilisateurRepository = utilisateurRepository;
        this.offreStageRepository = offreStageRepository;
    }


    @GetMapping("/{offerId}/applicants")
    public ResponseEntity<List<StudentGetDTO>> getApplicantsForOffer(@PathVariable Long offerId) {
        Optional<OffreStage> offreOpt = offreStageRepository.findById(offerId);

        if(!offreOpt.isPresent()){
            return ResponseEntity.status(404).build();
        }

        OffreStage offre = offreOpt.get();
        List<StudentGetDTO> studentDTOs = offre.getStudentDTOs();

        return ResponseEntity.ok(studentDTOs);
    }



}
