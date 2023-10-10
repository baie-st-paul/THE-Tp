package com.example.tpbackend.models.utilisateur.etudiant;

import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Entity
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

        @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
        private List<Candidature> candidatures;

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

        public static StudentGetDTO fromStudent(Student student) {
                StudentGetDTO studentGetDTO = new StudentGetDTO();
                BeanUtils.copyProperties(student,studentGetDTO);
                return studentGetDTO;
        }

        public String getMatricule() {
                return matricule;
        }

        public String getFirstName() {
                return firstName;
        }

        public String getLastName() {
                return lastName;
        }

        public String getPhoneNumber() {
                return phoneNumber;
        }

        public String getProgram() {
                return program;
        }

        public void setFirstName(String firstName) {
                this.firstName = firstName;
        }

        public void setLastName(String lastName) {
                this.lastName = lastName;
        }

        public void setPhoneNumber(String phoneNumber) {
                this.phoneNumber = phoneNumber;
        }

        public void setMatricule(String matricule) {
                this.matricule = matricule;
        }

        public void setProgram(String program) {
                this.program = program;
        }
}
