package com.example.tpbackend.DTO;


import com.example.tpbackend.models.OffreStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffreStageDTO {
    private String entreprise;
    private String poste;
    private String description;
}
