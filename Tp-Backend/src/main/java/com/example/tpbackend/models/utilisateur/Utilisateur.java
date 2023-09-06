package com.example.tpbackend.models.utilisateur;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public abstract class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private long id;

    public Utilisateur(String email, String password) {
        this.email = email;
        this.password = password;
    }

    private String email;
    private String password;


}
