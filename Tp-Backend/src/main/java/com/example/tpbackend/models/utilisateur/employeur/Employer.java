package com.example.tpbackend.models.utilisateur.employeur;

import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
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
