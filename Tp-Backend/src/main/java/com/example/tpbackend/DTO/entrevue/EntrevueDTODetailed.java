package com.example.tpbackend.DTO.entrevue;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Entrevue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntrevueDTODetailed {

    private long id;
    private String dateHeure;
    private String description;
    private String status;
    private String statusVuPasVuG;
    private String statusVuPasVuS;
    private EmployerGetDTO employer;
    private StudentGetDTO student;
    private OffreStageDTO offreStage;

    public static EntrevueDTODetailed toEntrevueDTODetailed(Entrevue entrevue) {
        if (entrevue == null) {
            throw new RuntimeException("Entrevue is null");
        }
        StudentGetDTO studentDto = StudentGetDTO.fromStudent(entrevue.getStudent());
        EmployerGetDTO employerDto = EmployerGetDTO.fromEmployer(entrevue.getEmployer());
        OffreStageDTO offreStageDto = OffreStageDTO.fromOffreStage(entrevue.getOffreStage());
        return new EntrevueDTODetailed(
                entrevue.getId(),
                entrevue.getDateHeure(),
                entrevue.getDescription(),
                String.valueOf(entrevue.getStatus()),
                String.valueOf(entrevue.getStatusVuPasVuG()),
                String.valueOf(entrevue.getStatusVuPasVuS()),
                employerDto,
                studentDto,
                offreStageDto
        );
    }
}
