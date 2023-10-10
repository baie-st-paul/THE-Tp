package com.example.tpbackend.models;

import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "candidature_id", nullable = false)
    private Long id;

    @Column(name = "lettre_motivation")
    private byte[] lettre_motivation;

    private String fileName;

    @ManyToOne
    @JoinColumn(name = "student_candidat",nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "offre_stage",nullable=false)
    private OffreStage offreStage;

    @ManyToOne
    @JoinColumn(name = "cv_student",nullable = false)
    private Cv cvStudent;

    public Candidature(byte[] lettre_motivation, Student student, OffreStage offreStage, Cv cvStudent,String fileName) {
        this.lettre_motivation = lettre_motivation;
        this.student = student;
        this.offreStage = offreStage;
        this.cvStudent = cvStudent;
        this.fileName = fileName;
    }

    public byte[] getLettreMotivation() {
        return lettre_motivation;
    }
}
