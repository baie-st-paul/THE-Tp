package com.example.tpbackend.controllers.dashboard;

import com.example.tpbackend.models.*;
import com.example.tpbackend.service.dashboard.DashboardUpdateStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/gestionnaire/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardUpdateStatus dashboardUpdateStatus;

    @PostMapping("/update/cv/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusCvVuG(@PathVariable String matricule, @PathVariable String status) {
        dashboardUpdateStatus.updateStatusCvVuG(matricule, Cv.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/offre/{titre}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusOffreVuG(@PathVariable String titre, @PathVariable String status) {
        dashboardUpdateStatus.updateStatusOffreVuG(titre, OffreStage.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/entrevue/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusEntrevueVuG(@PathVariable String matricule, @PathVariable String status) {
        dashboardUpdateStatus.updateStatusEntrevueVuG(matricule, Entrevue.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/embauche/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusCandidatureEmbaucheVuG(@PathVariable String matricule, @PathVariable String status) {
        dashboardUpdateStatus.updateStatusCandidatureEmbaucheVuG(matricule, Candidature.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/contrat/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusContratVuG(@PathVariable String matricule, @PathVariable String status) {
        dashboardUpdateStatus.updateStatusContratVuG(matricule, ContratStage.StatusVuPasVu.valueOf(status));
        return ResponseEntity.ok().build();
    }
}
