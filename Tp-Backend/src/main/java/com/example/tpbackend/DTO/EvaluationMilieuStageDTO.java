package com.example.tpbackend.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;


@Data
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
}
