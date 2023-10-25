package com.example.tpbackend.models;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class ContratStage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private Student student;

    @OneToOne
    private Employer employeur;

    private LocalDate startDate;
    private LocalDate endDate;
    private String responsibilities;
    private Double salary;

    private String workingHours;             // Les heures de travail prévues
    private String breakTime;                // Pause déjeuner ou autres pauses
    private String evaluationCriteria;       // Les critères sur lesquels l'étudiant sera évalué
    private String termsAndConditions;       // Autres termes et conditions spécifiques
    private Boolean confidentialityAgreement; // Si un accord de confidentialité est signé
    private Boolean signedByEmployer;
    private Boolean signedByStudent;
    /**
     * Les champs que dois contenir un contrat de stage n'ont pas ete definis dans Jira
     */


}
