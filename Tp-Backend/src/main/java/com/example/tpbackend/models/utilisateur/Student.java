package com.example.tpbackend.models.utilisateur;


import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
public class Student  {

        private String firstName;
        private String lastName;
        private String phoneNumber;
        @Id
        private String matricule;
        private String program;

        @OneToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "user_id")
        private Utilisateur utilisateur;


        public Student( String email,
                        String password,
                        String firstName,
                        String lastName,
                        String phoneNumber,
                        String matricule,
                        String program,
                        Utilisateur utilisateur) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.phoneNumber = phoneNumber;
                this.matricule = matricule;
                this.program = program;
                this.utilisateur = utilisateur;
        }

        public void setUtilisateur(Utilisateur utilisateur){
                this.utilisateur = utilisateur;
        }
}
