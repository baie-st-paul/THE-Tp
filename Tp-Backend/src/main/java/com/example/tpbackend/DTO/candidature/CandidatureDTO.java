package com.example.tpbackend.DTO.candidature;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Candidature;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidatureDTO {
    private Long id;

    private byte[] lettreMotivation;
    private String fileName;
    private StudentGetDTO student;
    private OffreStageDTO offreStage;
    private CvDTO cvStudent;
    private String status;

    public static CandidatureDTO fromCandidature(Candidature candidature) {
        if (candidature == null) {
            throw new RuntimeException("Candidature is null");
        }
        StudentGetDTO studentDto = StudentGetDTO.fromStudent(candidature.getStudent());
        OffreStageDTO offreStageDto = candidature.getOffreStage().toOffreStageDTO();
        CvDTO cvStudentDto = candidature.getCvStudent().toCvDTO();
        return new CandidatureDTO(
                candidature.getId(),
                candidature.getLettreMotivation(),
                candidature.getFileName(),
                studentDto,
                offreStageDto,
                cvStudentDto,
                String.valueOf(candidature.getStatus())
        );
    }
}
