package com.example.tpbackend.models.utilisateur;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity
@NoArgsConstructor

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)

public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    @Column(unique = true) // un utilisateur ne peut avoir qu'un seul email
    private String email;

    @JsonIgnore // ne pas afficher le mot de passe
    private String password;

    @Enumerated(EnumType.STRING)
    private Roles role;

    public Utilisateur(String email, String password, Roles role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public enum Roles {
        ADMIN,
        STUDENT,
        EMPLOYER
    }
}
