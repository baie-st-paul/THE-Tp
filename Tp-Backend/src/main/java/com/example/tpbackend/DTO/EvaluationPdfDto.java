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

}
