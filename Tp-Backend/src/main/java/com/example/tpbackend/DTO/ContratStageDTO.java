package com.example.tpbackend.DTO;

import com.example.tpbackend.models.ContratStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContratStageDTO {

    private Long id;
    private String studentId;
    private Long employeurId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String responsibilities;
    private Double salary;
    private String workingHours;
    private String breakTime;
    private String evaluationCriteria;
    private String termsAndConditions;
    private Boolean confidentialityAgreement;

    // Conversion d'une entité ContratStage vers DTO
    public static ContratStageDTO fromContratStage(ContratStage contratStage) {
        String matricule = null;
        if (contratStage.getStudent() != null) {
            matricule = contratStage.getStudent().getMatricule();
        }

        // Assurez-vous de vérifier les autres propriétés aussi, si nécessaire, par exemple contratStage.getEmployeur()
        Long employeurId = null;
        if (contratStage.getEmployeur() != null) {
            employeurId = contratStage.getEmployeur().getId();
        }

        return new ContratStageDTO(
                contratStage.getId(),
                matricule,
                employeurId,
                contratStage.getStartDate(),
                contratStage.getEndDate(),
                contratStage.getResponsibilities(),
                contratStage.getSalary(),
                contratStage.getWorkingHours(),
                contratStage.getBreakTime(),
                contratStage.getEvaluationCriteria(),
                contratStage.getTermsAndConditions(),
                contratStage.getConfidentialityAgreement()
        );
    }

    // Conversion d'un DTO vers une entité ContratStage
    public ContratStage toContratStage() {
        ContratStage contratStage = new ContratStage();
        contratStage.setId(this.id);
        contratStage.setStartDate(this.startDate);
        contratStage.setEndDate(this.endDate);
        contratStage.setResponsibilities(this.responsibilities);
        contratStage.setSalary(this.salary);
        contratStage.setWorkingHours(this.workingHours);
        contratStage.setBreakTime(this.breakTime);
        contratStage.setEvaluationCriteria(this.evaluationCriteria);
        contratStage.setTermsAndConditions(this.termsAndConditions);
        contratStage.setConfidentialityAgreement(this.confidentialityAgreement);
        return contratStage;
    }
}

