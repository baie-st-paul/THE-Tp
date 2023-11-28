package com.example.tpbackend.controllers.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTO;
import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTODetails;
import com.example.tpbackend.DTO.EvaluationPdfDto;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.RapportHeuresDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.service.OffreStageService;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employers")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EmployerController {
    private final OffreStageService offreStageService;
    private final StudentServices studentService;
    private final EmployerService employerService;

    @PostMapping("/dashboard/update/contrat/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> updateStatusContratVuE(@PathVariable String matricule, @PathVariable String status) {
        employerService.updateStatusContratVuE(matricule, status);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/candidature/accept/{matricule}/{status}")
    @PreAuthorize("authenticated")
    public ResponseEntity<Void> acceptCandidature(@PathVariable String matricule, @PathVariable String status) {
        studentService.updateCandidatureStatus(matricule, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getEmployer")
    @PreAuthorize("authenticated")
    public ResponseEntity<EmployerGetDTO> getEmployer() {
        return new ResponseEntity<>(employerService.getEmployerByAuthentication(), HttpStatus.OK);
    }

    @GetMapping("/{offerId}/applicants/nb")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> getApplicantsNumberForOffer(@PathVariable Long offerId) {
        Optional<OffreStageDTO> offreOpt = offreStageService.getOffreStageById(offerId);
        if(offreOpt.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune offre trouvée avec cet ID."));
        }
        List<CandidatureDTO> candidatures = studentService.getListCandidatureByOffreId(offerId);
        return ResponseEntity.ok(candidatures.size());
    }

    @GetMapping("/{offerId}/applicants")
    @PreAuthorize("authenticated")
    public ResponseEntity<?> getApplicantsForOffer(@PathVariable Long offerId) {
        Optional<OffreStageDTO> offreOpt = offreStageService.getOffreStageById(offerId);

        if(offreOpt.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune offre trouvée avec cet ID."));
        }

        List<CandidatureDTO> candidatures = studentService.getListCandidatureByOffreId(offerId);

        if(candidatures.isEmpty()){
            return ResponseEntity.status(404).body(Map.of("error", "Aucune candidature trouvée pour cette offre."));
        }
        return ResponseEntity.ok(candidatures);
    }

    @GetMapping("/candidatures")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<CandidatureDTO>> getCandidatures() {
        return ResponseEntity.ok(employerService.getAllCandidatures());
    }

    @PostMapping("/signerContrat")
    @PreAuthorize("authenticated")
    public ResponseEntity<ContratStageDTO> signContract(@RequestBody ContratStageDTO contratStageDTO) {
        try {
            employerService.signContract(contratStageDTO);
            return ResponseEntity.ok(contratStageDTO);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/employer-contracts/{employerId}")
    @PreAuthorize("authenticated")
    public ResponseEntity<List<ContratStageDTODetails>> getContratsByEmployeur(@PathVariable Long employerId) {
        List<ContratStageDTODetails> employerContracts = employerService.getContratStageByEmployeur(employerId);
        return ResponseEntity.ok(employerContracts);
    }

    @PostMapping(value = "/contracts/{id}/rapport_heures", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("authenticated")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, @PathVariable Long id) {
        try {
            RapportHeuresDTO rapportHeuresDTO = new RapportHeuresDTO(file);
            RapportHeuresDTO savedRapportHeuresDTO = employerService.saveRapportHeures(rapportHeuresDTO, id);

            return new ResponseEntity<>(savedRapportHeuresDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading the file");
        }
    }

    @PostMapping(value = "/upload_evaluation/{contractId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("authenticated")
    public ResponseEntity<?> handleFileUploadEvaluation(@RequestParam("file") MultipartFile file, @PathVariable Long contractId) {
        try {
            EvaluationPdfDto evaluationDTO = new EvaluationPdfDto(file);
            EvaluationPdfDto savedDocumentDto = employerService.saveEvaluation(evaluationDTO, contractId);

            return new ResponseEntity<>(savedDocumentDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Échec de l'enregistrement du fichier: " + e.getMessage());
        }
    }
}
