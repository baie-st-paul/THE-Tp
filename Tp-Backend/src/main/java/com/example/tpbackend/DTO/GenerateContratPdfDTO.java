package com.example.tpbackend.DTO;

import com.example.tpbackend.models.GenerateContratPDF;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenerateContratPdfDTO {
    private String name;
    private byte[] content;

    public GenerateContratPdfDTO(MultipartFile file) {
        this.name = file.getOriginalFilename();
        try {
            this.content = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static GenerateContratPdfDTO fromContratPdf(GenerateContratPDF generateContratPDF) {
        if (generateContratPDF == null) {
            return null;
        }

        GenerateContratPdfDTO dto = new GenerateContratPdfDTO();

        dto.setName(generateContratPDF.getName());
        dto.setContent(generateContratPDF.getContent());

        return dto;
    }

    public static GenerateContratPDF toContratPdf(GenerateContratPdfDTO generateContratPdfDTO) {
        if (generateContratPdfDTO == null) {
            return null;
        }

        GenerateContratPDF generateContratPDF = new GenerateContratPDF();

        generateContratPDF.setName(generateContratPdfDTO.getName());
        generateContratPDF.setContent(generateContratPdfDTO.getContent());

        return generateContratPDF;
    }
}
