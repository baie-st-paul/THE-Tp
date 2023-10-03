package com.example.tpbackend.controllers;

import com.example.tpbackend.DTO.StudentOfferDTO;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.service.StudentOfferService;
import com.example.tpbackend.service.utilisateur.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employers")
public class EmployerController {

    private final StudentOfferService studentOfferService;
    private final UserService userService;

    @Autowired
    public EmployerController(StudentOfferService studentOfferService, UserService userService) {
        this.studentOfferService = studentOfferService;
        this.userService = userService;
    }

    @GetMapping("/{employerId}/offers/{offerId}/applicantsSize")
        public ResponseEntity<Integer> getApplicantsSize (@PathVariable Long employerId, @PathVariable Long offerId) {
        Utilisateur currentUser = userService.getCurrentUser();
        // Vérifie si l'utilisateur actuel est bien un employeur
        if (currentUser == null || currentUser.getRole() != Utilisateur.Role.Employeur) {
            return ResponseEntity.status(403).build();
        }
        // Vérifie que l'ID de l'employeur correspond à l'utilisateur actuel
        if (!employerId.equals(currentUser.getId())) {
            return ResponseEntity.status(403).build();
        }
        List<StudentOfferDTO> applicants = studentOfferService.getStudentsByOfferId(offerId, currentUser);
        return ResponseEntity.ok(applicants.size());
    }

    @GetMapping("/{employerId}/offers/{offerId}/applicants")
    public ResponseEntity<List<StudentOfferDTO>> getApplicants(@PathVariable Long employerId,
                                                               @PathVariable Long offerId) {
        Utilisateur currentUser = userService.getCurrentUser();

        // Vérifie si l'utilisateur actuel est bien un employeur
        if (currentUser == null || currentUser.getRole() != Utilisateur.Role.Employeur) {
            return ResponseEntity.status(403).build();
        }

        // Vérifie que l'ID de l'employeur correspond à l'utilisateur actuel
        if (!employerId.equals(currentUser.getId())) {
            return ResponseEntity.status(403).build();
        }

        List<StudentOfferDTO> applicants = studentOfferService.getStudentsByOfferId(offerId, currentUser);
        return ResponseEntity.ok(applicants);
    }
}
