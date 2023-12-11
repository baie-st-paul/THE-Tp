package com.example.tpbackend.models;
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
    @JoinColumn(name = "Candidature_id")
    private Candidature candidature;

    @Enumerated(EnumType.STRING)
    private Statut statutEtudiant;

    @Enumerated(EnumType.STRING)
    private Statut statutEmployeur;

    @Enumerated(EnumType.STRING)
    private Statut statutGestionnaire;

    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statutVuPasVuG;

    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statutVuPasVuE;

    @Enumerated(EnumType.STRING)
    private StatusVuPasVu statutVuPasVuS;

    @OneToOne
    @JoinColumn(name = "rapport_heures_id")
    private RapportHeures rapportHeures;

    @OneToOne
    @JoinColumn(name = "contrat_generate_id")
    private GenerateContratPDF contratPDF;

    @OneToOne
    @JoinColumn(name = "evaluation_pdf_id")
    private EvaluationPDF evaluationPDF;

    @OneToOne
    @JoinColumn(name = "evaluation_milieu_stage_id")
    private EvaluationMilieuStagePDF evaluationMilieuStagePDF;

    private String nomDePoste;

    public enum Statut {
        Signer,
        Pas_Signer
    }
    public enum StatusVuPasVu {
        vu,
        pasVu
    }

}
