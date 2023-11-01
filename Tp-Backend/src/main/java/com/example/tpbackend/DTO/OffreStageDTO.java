package com.example.tpbackend.DTO;

import com.example.tpbackend.models.OffreStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffreStageDTO {
    private long id;
    private String titre;
    private double salaire;
    private String studentProgram;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private int nbMaxEtudiants;
    private String status;
    private long employerId;

    public OffreStage toOffreStage() {
        return new OffreStage(
                id,
                titre,
                salaire,
                studentProgram,
                description,
                dateDebut,
                dateFin,
                nbMaxEtudiants,
                status
        );
    }

    public static OffreStageDTO fromOffreStage(OffreStage offreStage) {
        if (offreStage == null) {
            return null;
        }
        OffreStageDTO offreStageDTO = new OffreStageDTO();
        BeanUtils.copyProperties(offreStage, offreStageDTO);
        return offreStageDTO;
    }
}
