package com.example.tpbackend.DTO.candidature;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidaturePostDTO {
    private String matricule;
    private Long idOffre;
    @JsonIgnore
    private MultipartFile lettre_motivation;
}
