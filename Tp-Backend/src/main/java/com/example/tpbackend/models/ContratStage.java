package com.example.tpbackend.models;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private Status statusEtudiant;

    @Enumerated(EnumType.STRING)
    private Status statusEmployeur;

    @Enumerated(EnumType.STRING)
    private Status statusGestionnaire;

    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statusVuPasVuG;

    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statusVuPasVuE;

    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statusVuPasVuS;

    private String nomDePoste;

    public enum Status {
        Signer,
        Pas_Signer
    }

    public enum StatusVuPasVu {
        vu,
        pasVu
    }

}
