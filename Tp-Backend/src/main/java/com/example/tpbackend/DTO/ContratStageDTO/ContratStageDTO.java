package com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.EvaluationPdfDto;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.utils.ByteArrayMultipartFile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContratStageDTO {
    private Long id;
    private Long candidatureId;
    private String nomEtudiant;
    private String nomDeCompanie;
    private String nomDePoste;
    private String prenomEtudiant;
    private String statutEtudiant;
    private String statutEmployeur;
    private String statutGestionnaire;
    private String statusVuPasVuG;
    private String statusVuPasVuE;
    private String statusVuPasVuS;
    private MultipartFile rapportFile;
    private EvaluationPdfDto evaluationPDF;

    public static ContratStageDTO fromContratStage(ContratStage contratStage) {
        if (contratStage == null) {
            return null;
        }


        ContratStageDTO dto = new ContratStageDTO();

        if (contratStage.getCandidature() != null) {
            dto.setCandidatureId(contratStage.getCandidature().getId());
        }

        if(contratStage.getRapportHeures() != null) {
            dto.setRapportFile(new ByteArrayMultipartFile(contratStage.getRapportHeures().getName(), contratStage.getRapportHeures().getName(), "application/pdf", contratStage.getRapportHeures().getData()));
        } else {
            dto.setRapportFile(null);
        }

        if (contratStage.getEvaluationPDF() != null) {
            dto.setEvaluationPDF(EvaluationPdfDto.fromEvaluationPDF(contratStage.getEvaluationPDF()));
        }

        dto.setStatutEtudiant(contratStage.getStatutEtudiant().toString());
        dto.setNomDeCompanie(contratStage.getCandidature().getOffreStage().getEmployer().getCompanyName());
        dto.setStatutEmployeur(contratStage.getStatutEmployeur().toString());
        dto.setStatutGestionnaire(contratStage.getStatutGestionnaire().toString());
        dto.setNomEtudiant(contratStage.getCandidature().getStudent().getUtilisateur().getLastName());
        dto.setNomDePoste(contratStage.getNomDePoste());
        dto.setId(contratStage.getId());
        dto.setPrenomEtudiant(contratStage.getCandidature().getStudent().getUtilisateur().getFirstName());
        dto.setStatusVuPasVuG(String.valueOf(contratStage.getStatutVuPasVuG()));
        dto.setStatusVuPasVuE(String.valueOf(contratStage.getStatutVuPasVuE()));
        dto.setStatusVuPasVuS(String.valueOf(contratStage.getStatutVuPasVuS()));
        return dto;
    }

    public ContratStage toContratStage(){
        ContratStage contratStage = new ContratStage();

        contratStage.setId(this.id);

        return contratStage;
    }
}



