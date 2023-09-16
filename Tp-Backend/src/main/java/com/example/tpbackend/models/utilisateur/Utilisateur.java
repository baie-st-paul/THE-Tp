package com.example.tpbackend.models.utilisateur;

import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
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


    public Utilisateur(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public UtilisateurDTO toLoginDTO() {
        return new UtilisateurDTO(
                email,
                password
        );
    }

}
