package com.example.tpbackend.models.utilisateur;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Employer {

    @Id
    private String companyId;
    private String firstName;
    private String lastName;
    private String companyName;
    private String phoneNumber;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private Utilisateur utilisateur;

    public Employer(
            String companyId,
            String firstName,
            String lastName,
            String companyName,
            String phoneNumber,
            Utilisateur utilisateur) {
        this.companyId = companyId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        this.utilisateur = utilisateur;
    }
}
