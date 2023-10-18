package com.example.tpbackend.models.utilisateur.etudiant;

import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Entity
@NoArgsConstructor
public class Student  {
        @Id
        private String matricule;
        private String program;

        @OneToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "user_id")
        private Utilisateur utilisateur;

        @ManyToMany(mappedBy = "etudiants")
        private List<OffreStage> offresStages;

        @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
        private List<Candidature> candidatures;

        public Student( String matricule, String program) {
                this.matricule = matricule;
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

        public String getProgram() {
                return program;
        }

        public void setMatricule(String matricule) {
                this.matricule = matricule;
        }

        public void setProgram(String program) {
                this.program = program;
        }

        public Utilisateur getUtilisateur() {
                return utilisateur;
        }
}
