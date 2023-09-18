package com.example.tpbackend.models.utilisateur;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Gestionnaire {
    @Id
    private String matricule;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    public Gestionnaire(String matricule, Utilisateur utilisateur) {
        this.matricule = matricule;
        this.utilisateur = utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur){
        this.utilisateur = utilisateur;
    }
}
