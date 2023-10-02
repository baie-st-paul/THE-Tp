package com.example.tpbackend.models.utilisateur;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Entrevue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String date;
    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
    private String description;
    @Enumerated(EnumType.STRING)
    private Status status;


    public Entrevue(String date, Employer employer, Student student, String description) {
        this.date = date;
        this.employer = employer;
        this.student = student;
        this.status = Status.EnAttente;
        this.description = description;
    }

    public enum Status{
        EnAttente,
        Vue,
        Acceptee,
        Refusee
    }

}


