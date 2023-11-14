package com.example.tpbackend.DTO;
import com.example.tpbackend.models.ContratStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContratStageDTO {
    private Long id;
    private String studentId;
    private Long employerId;
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

    public static ContratStageDTO fromContratStage(ContratStage contratStage) {
        if (contratStage == null) {
            return null;
        }

        ContratStageDTO dto = new ContratStageDTO();

        if (contratStage.getStudent() != null) {
            dto.setStudentId(contratStage.getStudent().getMatricule());
        }

        if (contratStage.getEmployeur() != null) {
            dto.setEmployerId(contratStage.getEmployeur().getId());
        }

        dto.setStatutEtudiant(contratStage.getStatutEtudiant().toString());
        dto.setNomDeCompanie(contratStage.getEmployeur().getCompanyName());
        dto.setStatutEmployeur(contratStage.getStatutEmployeur().toString());
        dto.setStatutGestionnaire(contratStage.getStatutGestionnaire().toString());
        dto.setNomEtudiant(contratStage.getStudent().getUtilisateur().getLastName());
        dto.setNomDePoste(contratStage.getNomDePoste());
        dto.setId(contratStage.getId());
        dto.setPrenomEtudiant(contratStage.getStudent().getUtilisateur().getFirstName());
        dto.setStatusVuPasVuG(String.valueOf(contratStage.getStatutVuPasVuG()));
        dto.setStatusVuPasVuE(String.valueOf(contratStage.getStatutVuPasVuE()));
        dto.setStatusVuPasVuS(String.valueOf(contratStage.getStatutVuPasVuS()));
        return dto;
    }
    public ContratStage toContratStage() {
        ContratStage contratStage = new ContratStage();

        contratStage.setId(this.id);

        return contratStage;
    }
}



