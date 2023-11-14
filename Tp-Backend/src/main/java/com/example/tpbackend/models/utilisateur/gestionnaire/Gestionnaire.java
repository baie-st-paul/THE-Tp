package com.example.tpbackend.models.utilisateur.gestionnaire;

import com.example.tpbackend.DTO.signature.SignatureGestionnaireDTO;
import com.example.tpbackend.models.signature.SignatureGestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
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

    @OneToOne
    @JoinColumn(name = "signature_id")
    private SignatureGestionnaire signature;

    public Gestionnaire(String matricule) {
        this.matricule = matricule;
    }

    public void setUtilisateur(Utilisateur utilisateur){
        this.utilisateur = utilisateur;
    }
}
