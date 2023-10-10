package com.example.tpbackend.models.utilisateur.gestionnaire;

import com.example.tpbackend.models.utilisateur.Utilisateur;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Gestionnaire {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    @Id
    private String matricule;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    public Gestionnaire(String firstName, String lastName, String matricule, String phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.matricule = matricule;
        this.phoneNumber = phoneNumber;
    }

    public void setUtilisateur(Utilisateur utilisateur){
        this.utilisateur = utilisateur;
    }
}
