package com.example.tpbackend.DTO.ContratStageDTO;

import com.example.tpbackend.DTO.EvaluationMilieuStageDTO;
import com.example.tpbackend.DTO.EvaluationPdfDto;
import com.example.tpbackend.DTO.GenerateContratPdfDTO;
import com.example.tpbackend.DTO.RapportHeuresDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTODetailed;
import com.example.tpbackend.models.ContratStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContratStageDTODetails {
    private Long id;
    private CandidatureDTODetailed candidatureDTO;
    private EvaluationPdfDto evaluationPDF;
    private String statutEtudiant;
    private String statutEmployeur;
    private String statutGestionnaire;
    private String statusVuPasVuG;
    private String statusVuPasVuE;
    private String statusVuPasVuS;
    private RapportHeuresDTO rapportFile;
    private GenerateContratPdfDTO generateContrat;
    private EvaluationMilieuStageDTO evaluationMilieuStage;

    public static ContratStageDTODetails fromContratStage(ContratStage contratStage) {
        if (contratStage == null) {
            return null;
        }

        ContratStageDTODetails dto = new ContratStageDTODetails();


        if (contratStage.getCandidature() != null) {
            dto.setCandidatureDTO(CandidatureDTODetailed.fromCandidature(contratStage.getCandidature()));
        }

        if(contratStage.getRapportHeures() != null) {
            dto.setRapportFile(RapportHeuresDTO.fromRapportHeure(contratStage.getRapportHeures()));
        }

        if (contratStage.getEvaluationPDF() != null) {
            dto.setEvaluationPDF(EvaluationPdfDto.fromEvaluationPDF(contratStage.getEvaluationPDF()));
        }

        if (contratStage.getContratPDF() != null) {
            dto.setGenerateContrat(GenerateContratPdfDTO.fromContratPdf(contratStage.getContratPDF()));
        }

        if (contratStage.getEvaluationMilieuStage() != null) {
            dto.setEvaluationMilieuStage(EvaluationMilieuStageDTO.fromEvaluationMilieuStage(contratStage.getEvaluationMilieuStage()));
        }

        dto.setStatutEtudiant(contratStage.getStatutEtudiant().toString());
        dto.setStatutEmployeur(contratStage.getStatutEmployeur().toString());
        dto.setStatutGestionnaire(contratStage.getStatutGestionnaire().toString());
        dto.setId(contratStage.getId());
        dto.setStatusVuPasVuG(String.valueOf(contratStage.getStatutVuPasVuG()));
        dto.setStatusVuPasVuE(String.valueOf(contratStage.getStatutVuPasVuE()));
        dto.setStatusVuPasVuS(String.valueOf(contratStage.getStatutVuPasVuS()));
        return dto;
    }
}
