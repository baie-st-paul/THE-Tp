package com.example.tpbackend.DTO;

import com.example.tpbackend.models.RapportHeures;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class RapportHeuresDTO {
    private String name;
    private byte[] data;

    public RapportHeuresDTO(MultipartFile file){
        this.name = file.getOriginalFilename();
        try {
            this.data = file.getBytes();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
