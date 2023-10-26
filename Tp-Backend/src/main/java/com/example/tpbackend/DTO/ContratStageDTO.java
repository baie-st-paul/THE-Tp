package com.example.tpbackend.DTO;

import com.example.tpbackend.models.ContratStage;
import lombok.Data;

@Data
public class ContratStageDTO {
    private Long id;
    private String studentId;
    private Long employerId;

    public static ContratStageDTO fromContratStage(ContratStage contratStage) {
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
    }

    public ContratStage toContratStage() {
        ContratStage contratStage = new ContratStage();

        contratStage.setId(this.id);

        return contratStage;
    }
}



