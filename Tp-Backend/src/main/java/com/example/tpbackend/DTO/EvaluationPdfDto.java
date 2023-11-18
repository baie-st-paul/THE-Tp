package com.example.tpbackend.DTO;


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

    public EvaluationPdfDto(MultipartFile file) throws IOException {
        this.name = file.getOriginalFilename();
        this.content = file.getBytes();
    }
}
