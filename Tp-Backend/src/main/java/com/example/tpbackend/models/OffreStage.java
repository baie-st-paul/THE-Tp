package com.example.tpbackend.models;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffreStage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String titre;
    private Double salaire;
    private String studentProgram;

    @Column(length = 2000)
    private String description;

    private LocalDate dateDebut;
    private LocalDate dateFin;
    
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

    public OffreStage(long id, String titre, Double salaire, String studentProgram,
                      String description, LocalDate dateDebut,
                      LocalDate dateFin, String status) {
        this.id = id;
        this.titre = titre;
        this.salaire = salaire;
        this.studentProgram = studentProgram;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
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
                String.valueOf(status)
        );
    }

    public Long getEmployerId() {
        return employer.getId();
    }

    public List<StudentGetDTO> getStudentDTOs() {
        return this.etudiants.stream()
                .map(student -> {
                    String email = (student.getUtilisateur() != null) ? student.getUtilisateur().getEmail() : null;

                    return new StudentGetDTO(
                            student.getFirstName(),
                            student.getLastName(),
                            email,
                            student.getPhoneNumber(),
                            student.getMatricule(),
                            student.getProgram());
                })
                .collect(Collectors.toList());
    }


    public enum Status{
        Accepted,
        In_review,
        Refused,
    }
}
