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
    private Long employerId;
    private String titre;
    private double salaire;
    private String studentProgram;
    private String description;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String status;

    public OffreStage toOffreStage() {
        return new OffreStage(
                id,
                titre,
                salaire,
                studentProgram,
                description,
                dateDebut,
                dateFin,
                status
        );
    }

    public static OffreStageDTO fromOffreStage(OffreStage offreStage) {
        OffreStageDTO offreStageDTO = new OffreStageDTO();
        BeanUtils.copyProperties(offreStage, offreStageDTO);
        return offreStageDTO;
    }
}
