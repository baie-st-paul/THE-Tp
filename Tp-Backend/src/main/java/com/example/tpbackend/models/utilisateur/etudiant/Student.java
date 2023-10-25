package com.example.tpbackend.models.utilisateur.etudiant;

import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.Signature;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Student  {

        @Setter
        private String firstName;

        @Setter
        private String lastName;

        @Setter
        private String phoneNumber;

        @Setter
        @Id
        private String matricule;

        @Setter
        private String program;

        @Setter
        @OneToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "user_id")
        private Utilisateur utilisateur;

        @Setter
        @ManyToMany(mappedBy = "etudiants")
        private List<OffreStage> offresStages;

        @Setter
        @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
        private List<Candidature> candidatures;

        @OneToOne(mappedBy = "user")
        @JoinColumn(name = "signature_id", referencedColumnName = "id")
        private Signature signature;

        public Student(String firstName, String lastName, String matricule, String phoneNumber, String program) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.matricule = matricule;
                this.phoneNumber = phoneNumber;
                this.program = program;
        }

        public static StudentGetDTO fromStudent(Student student) {
                StudentGetDTO studentGetDTO = new StudentGetDTO();
                BeanUtils.copyProperties(student,studentGetDTO);
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
