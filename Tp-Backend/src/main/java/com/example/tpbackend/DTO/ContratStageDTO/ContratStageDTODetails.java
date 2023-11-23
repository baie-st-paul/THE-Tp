package com.example.tpbackend.DTO.ContratStageDTO;

import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTODetailed;
import com.example.tpbackend.models.ContratStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContratStageDTODetails {
    private Long id;
    private CandidatureDTODetailed candidatureDTO;
    private String statutEtudiant;
    private String statutEmployeur;
    private String statutGestionnaire;
    private String statusVuPasVuG;
    private String statusVuPasVuE;
    private String statusVuPasVuS;

    public static ContratStageDTODetails fromContratStage(ContratStage contratStage) {
        if (contratStage == null) {
            return null;
        }

        ContratStageDTODetails dto = new ContratStageDTODetails();


        if (contratStage.getCandidature() != null) {
            dto.setCandidatureDTO(CandidatureDTODetailed.fromCandidature(contratStage.getCandidature()));
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
