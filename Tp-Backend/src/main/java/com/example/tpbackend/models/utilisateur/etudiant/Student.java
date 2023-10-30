package com.example.tpbackend.models.utilisateur.etudiant;

import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Getter
@Setter
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

        public Student(String matricule, String program, Utilisateur utilisateur) {
                this.matricule = matricule;
                this.program = program;
                this.utilisateur = utilisateur;
        }

        public static StudentGetDTO fromStudent(Student student) {
            StudentGetDTO studentGetDTO = new StudentGetDTO();
            BeanUtils.copyProperties(student,studentGetDTO);
            studentGetDTO.setFirstName(student.getUtilisateur().getFirstName());
            studentGetDTO.setLastName(student.getUtilisateur().getLastName());
            studentGetDTO.setEmail(student.getUtilisateur().getEmail());
            studentGetDTO.setPhoneNumber(student.getUtilisateur().getPhoneNumber());
            return studentGetDTO;
        }

        public StudentGetDTO toStudentDTO() {
                return new StudentGetDTO(
                        firstName,
                        lastName,
                        utilisateur.getEmail(),
                        phoneNumber,
                        matricule,
                        program
                );
        }
}
