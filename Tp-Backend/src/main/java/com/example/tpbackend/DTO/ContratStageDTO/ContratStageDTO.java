package com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.EvaluationPdfDto;
import com.example.tpbackend.DTO.GenerateContratPdfDTO;
import com.example.tpbackend.DTO.RapportHeuresDTO;
import com.example.tpbackend.models.ContratStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private RapportHeuresDTO rapportFile;
    private EvaluationPdfDto evaluationPDF;
    private GenerateContratPdfDTO generateContrat;

    public static ContratStageDTO fromContratStage(ContratStage contratStage) {
        if (contratStage == null) {
            return null;
        }


        ContratStageDTO dto = new ContratStageDTO();

        if (contratStage.getCandidature() != null) {
            dto.setCandidatureId(contratStage.getCandidature().getId());
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



