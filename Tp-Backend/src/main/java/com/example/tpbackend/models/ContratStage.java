package com.example.tpbackend.models;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ContratStage {

    public ContratStage(Long id, Student student, Employer employeur) {
        this.id = id;
        this.student = student;
        this.employeur = employeur;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @OneToOne
    @JoinColumn(name = "employer_id")
    private Employer employeur;

    @ManyToOne
    @JoinColumn(name = "signature_emp_id")
    private Signature signatureEmp;
}
