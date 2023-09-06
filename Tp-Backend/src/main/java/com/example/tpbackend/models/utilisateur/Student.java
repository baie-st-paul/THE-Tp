package com.example.tpbackend.models.utilisateur;


import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@PrimaryKeyJoinColumn(name ="student_id")
@ToString(callSuper = true)
public class Student extends Utilisateur {

        private String firstName;
        private String lastName;
        private String phoneNumber;
        private String matricule;
        private String program;


        public Student( String email, String password, String firstName, String lastName, String phoneNumber, String matricule, String program) {
                super( email, password);
                this.firstName = firstName;
                this.lastName = lastName;
                this.phoneNumber = phoneNumber;
                this.matricule = matricule;
                this.program = program;
        }
}
