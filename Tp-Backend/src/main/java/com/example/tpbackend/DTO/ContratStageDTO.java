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
    private String nomDePoste;
    private String prenomEtudiant;
    private String statutEtudiant;
    private String statutEmployeur;
    private String statutGestionnaire;

    public static ContratStageDTO fromContratStage(ContratStage contratStage) {
        ContratStageDTO dto = new ContratStageDTO();
        dto.setId(contratStage.getId());
        dto.setStudentId(contratStage.getStudent().getMatricule());
        dto.setEmployerId(contratStage.getEmployeur().getId());
        dto.setStatutEtudiant(ContratStage.Statut.Pas_Signer.toString());
        dto.setStatutEmployeur(ContratStage.Statut.Pas_Signer.toString());
        dto.setStatutGestionnaire(ContratStage.Statut.Pas_Signer.toString());
        dto.setNomEtudiant(contratStage.getStudent().getUtilisateur().getLastName());
        dto.setPrenomEtudiant(contratStage.getStudent().getUtilisateur().getFirstName());
        dto.setNomDePoste(contratStage.getNomDePoste());
        return dto;
    }

    public ContratStage toContratStage() {
        ContratStage contratStage = new ContratStage();

        contratStage.setId(this.id);

        return contratStage;
    }
}



