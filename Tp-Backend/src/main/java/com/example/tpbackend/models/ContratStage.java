package com.example.tpbackend.models;
import com.example.tpbackend.models.signature.SignatureGestionnaire;
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
    @JoinColumn(name = "signature_id")
    private SignatureGestionnaire gestionnaireSignature;

    private String fileName;
    @Column(name = "rapport_heures")
    private byte[] rapportHeures;

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
