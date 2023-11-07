package com.example.tpbackend.DTO;

import com.example.tpbackend.models.ContratStage;
import lombok.Data;

@Data
public class ContratStageDTO {
    private Long id;
    private String studentId;
    private Long employerId;
    private String nomEtudiant;
    private String nomDePoste;
    private String prenomEtudiant;
    private String statutEtudiant;
    private String statusEmployeur;
    private String statusGestionnaire;

   /* public static ContratStageDTO fromContratStage(ContratStage contratStage) {
        if (contratStage == null) {
            return null;
        }

        ContratStageDTO dto = new ContratStageDTO();

        dto.setId(contratStage.getId());

        if (contratStage.getStudent() != null) {
            dto.setStudentId(contratStage.getStudent().getMatricule());
        }

        if (contratStage.getEmployeur() != null) {
            dto.setEmployerId(contratStage.getEmployeur().getId());
        }
        return dto;
    }*/


    public static ContratStageDTO fromContratStage(ContratStage contratStage, String nomEtudiant, String prenomEtudiant, String nomDePoste, String statutEtudiant, String statusEmployeur, String statusGestionnaire) {

        if (contratStage == null) {
            return null;
        }

        ContratStageDTO dto = new ContratStageDTO();

        dto.setId(contratStage.getId());

        if (contratStage.getStudent() != null) {
            dto.setStudentId(contratStage.getStudent().getMatricule());
        }

        if (contratStage.getEmployeur() != null) {
            dto.setEmployerId(contratStage.getEmployeur().getId());
        }

        dto.setNomEtudiant(ContratStage.getStudent().getUtilisateur().getLastName());
        dto.setNomDePoste(nomDePoste);
        dto.setPrenomEtudiant(prenomEtudiant);
        dto.setStatutEtudiant(ContratStage.Status.Pas_signer.toString());
        dto.setStatusEmployeur(ContratStage.Status.Pas_signer.toString());
        dto.setStatusGestionnaire(ContratStage.Status.Pas_signer.toString());
        return dto;
    }

    public ContratStage toContratStage() {
        ContratStage contratStage = new ContratStage();

        contratStage.setId(this.id);

        return contratStage;
    }
}



