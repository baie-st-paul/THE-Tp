package com.example.tpbackend.DTO.candidature;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Candidature;
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

    public static CandidatureDTO fromCandidature(Candidature candidature) {
        if (candidature == null) {
            return null;
        }

        StudentGetDTO studentDto = StudentGetDTO.fromStudent(candidature.getStudent());
        OffreStageDTO offreStageDto = OffreStageDTO.fromOffreStage(candidature.getOffreStage());
        CvDTO cvStudentDto = candidature.getCvStudent().toCvDTO();
        return new CandidatureDTO(
                candidature.getId(),
                candidature.getLettreMotivation(),
                candidature.getFileName(),
                studentDto,
                offreStageDto,
                cvStudentDto
        );
    }
}