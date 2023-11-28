package com.example.tpbackend.DTO;

import com.example.tpbackend.models.EvaluationMilieuStage;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.Tag;
import com.example.tpbackend.utils.ByteArrayMultipartFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private String statusVuPasVuG;
    private String statusVuPasVuS;
    private long employerId;
    private String tag;

    public OffreStage toOffreStage() {
        OffreStage offreStage = new OffreStage(
                id,
                titre,
                salaire,
                studentProgram,
                description,
                dateDebut,
                dateFin,
                nbMaxEtudiants,
                status,
                statusVuPasVuG,
                statusVuPasVuS
        );

        return offreStage;
    }

    public static OffreStageDTO fromOffreStage(OffreStage offreStage) {
        if (offreStage == null) {
            return null;
        }
        OffreStageDTO offreStageDTO = new OffreStageDTO();
        BeanUtils.copyProperties(offreStage, offreStageDTO);
        offreStageDTO.setEmployerId(offreStage.getEmployer().getId());
        return offreStageDTO;
    }
}
