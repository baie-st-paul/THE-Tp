package com.example.tpbackend.models;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ContratStage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employeur;

    @Enumerated(EnumType.STRING)
    private ContratStage.Statut statutEtudiant;

    @Enumerated(EnumType.STRING)
    private ContratStage.Statut statutEmployeur;

    @Enumerated(EnumType.STRING)
    private ContratStage.Statut statutGestionnaire;

    private String nomDePoste;
    public enum Statut {
        Signer,
        Pas_Signer,
        vu,
        pasVu
    }

}
