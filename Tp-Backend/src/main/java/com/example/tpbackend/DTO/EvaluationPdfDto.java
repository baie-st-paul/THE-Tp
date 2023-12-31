package com.example.tpbackend.DTO;


import com.example.tpbackend.models.EvaluationPDF;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EvaluationPdfDto {
    private String name;
    private byte[] content;

    public EvaluationPdfDto(MultipartFile file) {
        this.name = file.getOriginalFilename();
        try {
            this.content = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static EvaluationPdfDto fromEvaluationPDF(EvaluationPDF evaluationPDF) {
        if (evaluationPDF == null) {
            return null;
        }

        EvaluationPdfDto dto = new EvaluationPdfDto();

        dto.setName(evaluationPDF.getName());
        dto.setContent(evaluationPDF.getContent());

        return dto;
    }

    public static EvaluationPDF toEvaluationPDF(EvaluationPdfDto evaluationPdfDto) {
        if (evaluationPdfDto == null) {
            return null;
        }

        EvaluationPDF evaluationPDF = new EvaluationPDF();

        evaluationPDF.setName(evaluationPdfDto.getName());
        evaluationPDF.setContent(evaluationPdfDto.getContent());

        return evaluationPDF;
    }

}
