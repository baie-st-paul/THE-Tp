package com.example.tpbackend.models;

import com.example.tpbackend.DTO.EntrevueDTO;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String dateHeure;
    private String description;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Enumerated(EnumType.STRING)
    private Status status;


    public Entrevue(long id, String dateHeure, String description, String status) {
        this.id = id;
        this.dateHeure = dateHeure;
        this.description = description;
        this.status = Status.valueOf(status);
    }

    public EntrevueDTO toEntrevueDTO() {
        return new EntrevueDTO(
                id,
                dateHeure,
                description,
                String.valueOf(status),
                employer.getId() + "",
                student.getMatricule()
        );
    }

    public enum Status{
        EnAttente,
        Vue,
        Acceptee,
        Refusee
    }

}
