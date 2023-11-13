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
    private String nomDeCompany;
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

        dto.setId(contratStage.getId());

        dto.setStatutEtudiant(ContratStage.Status.Pas_Signer.toString());
        dto.setStatutEmployeur(ContratStage.Status.Pas_Signer.toString());
        dto.setStatutGestionnaire(ContratStage.Status.Pas_Signer.toString());
        dto.setStatusVuPasVuG(String.valueOf(contratStage.getStatusVuPasVuG()));
        dto.setStatusVuPasVuE(String.valueOf(contratStage.getStatusVuPasVuE()));
        dto.setStatusVuPasVuS(String.valueOf(contratStage.getStatusVuPasVuS()));

        dto.setNomEtudiant(contratStage.getStudent().getUtilisateur().getLastName());
        dto.setPrenomEtudiant(contratStage.getStudent().getUtilisateur().getFirstName());
        dto.setNomDeCompany(contratStage.getNomDePoste());
        return dto;
    }

    public ContratStage toContratStage() {
        ContratStage contratStage = new ContratStage();

        contratStage.setId(this.id);

        return contratStage;
    }
}



