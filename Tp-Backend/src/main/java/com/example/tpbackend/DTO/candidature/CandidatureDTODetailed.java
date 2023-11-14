package com.example.tpbackend.DTO.candidature;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Candidature;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidatureDTODetailed {
    private Long id;
    private byte[] lettreMotivation;
    private String fileName;
    private StudentGetDTO student;
    private EmployerGetDTO employer;
    private OffreStageDTO offreStage;
    private CvDTO cvStudent;
    private String status;
    private String statusVuPasVuG;
    private String statusVuPasVuE;
    private String tagName;

    public static CandidatureDTODetailed toCandidatureDTODetailed(Candidature candidature) {
        if (candidature == null) {
            throw new RuntimeException("Candidature is null");
        }
        StudentGetDTO studentDto = StudentGetDTO.fromStudent(candidature.getStudent());
        EmployerGetDTO employerDto = EmployerGetDTO.fromEmployer(candidature.getOffreStage().getEmployer());
        OffreStageDTO offreStageDto = OffreStageDTO.fromOffreStage(candidature.getOffreStage());
        CvDTO cvStudentDto = candidature.getCvStudent().toCvDTO();
        return new CandidatureDTODetailed(
                candidature.getId(),
                candidature.getLettreMotivation(),
                candidature.getFileName(),
                studentDto,
                employerDto,
                offreStageDto,
                cvStudentDto,
                String.valueOf(candidature.getStatus()),
                String.valueOf(candidature.getStatusVuPasVuG()),
                String.valueOf(candidature.getStatusVuPasVuE()),
                offreStageDto.getTag()
        );
    }
}
