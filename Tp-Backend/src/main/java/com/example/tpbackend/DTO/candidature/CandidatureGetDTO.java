package com.example.tpbackend.DTO.candidature;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.utils.CandidatureGetDTOSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize(using = CandidatureGetDTOSerializer.class)
public class CandidatureGetDTO {
    private String matricule;
    private OffreStageDTO offreStageDTO;
    private String fileName;
    private MultipartFile lettre_motivation;
}
