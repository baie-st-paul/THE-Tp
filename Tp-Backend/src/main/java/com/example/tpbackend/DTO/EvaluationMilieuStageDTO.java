package com.example.tpbackend.DTO;

import com.example.tpbackend.models.EvaluationMilieuStage;
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
            e.printStackTrace();
        }
    }

    public static EvaluationMilieuStageDTO fromEvaluationMilieuStage(EvaluationMilieuStage evaluationMilieuStage) {
        if (evaluationMilieuStage == null) {
            return null;
        }

        EvaluationMilieuStageDTO dto = new EvaluationMilieuStageDTO();

        dto.setName(evaluationMilieuStage.getName());
        dto.setData(evaluationMilieuStage.getData());

        return dto;
    }
}
