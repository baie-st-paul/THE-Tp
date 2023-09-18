package com.example.tpbackend.models.utilisateur;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

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


        public Student(String firstName, String lastName, String matricule, String phoneNumber, String program) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.matricule = matricule;
                this.phoneNumber = phoneNumber;
                this.program = program;
        }

        public void setUtilisateur(Utilisateur utilisateur){
                this.utilisateur = utilisateur;
        }
}
