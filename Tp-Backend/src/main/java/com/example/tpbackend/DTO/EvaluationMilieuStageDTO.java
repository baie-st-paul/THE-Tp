package com.example.tpbackend.DTO;

import com.example.tpbackend.models.EvaluationMilieuStagePDF;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Data
@NoArgsConstructor
public class EvaluationMilieuStageDTO {
    private String name;
    private byte[] data;

    public EvaluationMilieuStageDTO(MultipartFile file) {
        this.name = file.getOriginalFilename();
        try {
            this.data = file.getBytes();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static EvaluationMilieuStageDTO fromEvaluationMilieuStage(EvaluationMilieuStagePDF evaluationMilieuStagePDF) {
        if (evaluationMilieuStagePDF == null) {
            return null;
        }

        EvaluationMilieuStageDTO dto = new EvaluationMilieuStageDTO();

        dto.setName(evaluationMilieuStagePDF.getName());
        dto.setData(evaluationMilieuStagePDF.getData());

        return dto;
    }

    public static EvaluationMilieuStagePDF toEvaluationMilieuStagePDF(EvaluationMilieuStageDTO evaluationMilieuStageDTO) {
        if (evaluationMilieuStageDTO == null) {
            return null;
        }

        EvaluationMilieuStagePDF evaluationMilieuStagePDF = new EvaluationMilieuStagePDF();

        evaluationMilieuStagePDF.setName(evaluationMilieuStageDTO.getName());
        evaluationMilieuStagePDF.setData(evaluationMilieuStageDTO.getData());

        return evaluationMilieuStagePDF;
    }
}
