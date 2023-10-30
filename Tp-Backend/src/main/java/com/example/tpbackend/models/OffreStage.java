package com.example.tpbackend.models;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class OffreStage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String titre;
    private Double salaire;
    private String studentProgram;

    @Column(length = 2000)
    private String description;

    private LocalDate dateDebut;
    private LocalDate dateFin;
    @NotNull(message = "Le nombre maximal d'étudiants ne doit pas être null.")
    @PositiveOrZero(message = "Le nombre maximal d'étudiants doit être positif ou zéro.")
    private int nbMaxEtudiants;
    
    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @ManyToMany
    @JoinTable(
            name = "offre_etudiant",
            joinColumns = @JoinColumn(name = "offre_id"),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    private List<Student> etudiants;

    @Column(name = "tag_name")
    private String tagName;

    public OffreStage(long id, String titre, Double salaire, String studentProgram,
                      String description, LocalDate dateDebut,
                      LocalDate dateFin, int nbMaxEtudiant, String status) {
        this.id = id;
        this.titre = titre;
        this.salaire = salaire;
        this.studentProgram = studentProgram;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.nbMaxEtudiants = nbMaxEtudiant;
        this.status = Status.valueOf(status);
    }

    public OffreStageDTO toOffreStageDTO() {
        return new OffreStageDTO(
                id,
                employer.getId(),
                titre,
                salaire,
                studentProgram,
                description,
                dateDebut,
                dateFin,
                String.valueOf(status),
                nbMaxEtudiants,
                tagName
        );
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public enum Status{
        Accepted,
        In_review,
        Refused,
    }
}
