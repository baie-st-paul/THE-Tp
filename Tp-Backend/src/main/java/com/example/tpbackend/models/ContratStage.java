package com.example.tpbackend.models;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContratStage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToOne
    @JoinColumn(name = "employer_id")
    private Employer employeur;

    @Enumerated(EnumType.STRING)
    private ContratStage.Status statusGestionnaire;

    @Enumerated(EnumType.STRING)
    private ContratStage.Status statusEmployeur;

    @Enumerated(EnumType.STRING)
    private ContratStage.Status statusEtudiant;

    private String nomDePoste;

    public enum Status {
        Signer,
        Pas_signer
    }
}
