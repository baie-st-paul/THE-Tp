package com.example.tpbackend.models;

import com.example.tpbackend.DTO.entrevue.EntrevueDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String dateHeure;
    private String description;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "offre_stage")
    private OffreStage offreStage;

    @Enumerated(EnumType.STRING)
    private Status status;


    public EntrevueDTO toEntrevueDTO() {
        return new EntrevueDTO(
                id,
                dateHeure,
                description,
                String.valueOf(status),
                employer.getCompanyName(),
                employer.getId() + "",
                student.getMatricule(),
                offreStage.getId() + ""
        );
    }

    public enum Status{
        EnAttente,
        Vue,
        Acceptee,
        Refusee
    }

}
