package com.example.tpbackend.models.utilisateur.employeur;

import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.signature.Signature;
import com.example.tpbackend.models.signature.SignatureEmployer;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Employer {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;
    private String companyName;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OffreStage> offresStages;

    @OneToOne(mappedBy = "employer")
    @JoinColumn(name = "signature_id")
    private Signature signature;

    @OneToOne(mappedBy = "employer")
    @JoinColumn(name = "signature_employer_id")
    private SignatureEmployer signatureEmployer;

    public Employer(Long id, String companyName, Utilisateur utilisateur) {
        this.id = id;
        this.companyName = companyName;
        this.utilisateur = utilisateur;
    }

    public Employer(String companyName, Utilisateur utilisateur) {
        this.companyName = companyName;
        this.utilisateur = utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur){
        this.utilisateur = utilisateur;
    }
}
