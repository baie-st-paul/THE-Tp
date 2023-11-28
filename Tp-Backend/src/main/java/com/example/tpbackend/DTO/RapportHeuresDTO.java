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
            throw new RuntimeException(e);
        }
    }

    public static RapportHeuresDTO fromRapportHeure(RapportHeures rapportHeures) {
        if (rapportHeures == null) {
            return null;
        }

        RapportHeuresDTO rapportHeuresDTO = new RapportHeuresDTO();
        rapportHeuresDTO.setName(rapportHeures.getName());
        rapportHeuresDTO.setData(rapportHeures.getData());

        return rapportHeuresDTO;
    }

    public static RapportHeures toRapportHeure(RapportHeuresDTO rapportHeuresDTO) {
        if (rapportHeuresDTO == null) {
            return null;
        }

        RapportHeures rapportHeures = new RapportHeures();

        rapportHeures.setName(rapportHeuresDTO.getName());
        rapportHeures.setData(rapportHeuresDTO.getData());

        return rapportHeures;
    }
}
