package com.example.tpbackend.DTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class EntrevueDTODetailed {

    private long id;
    private String dateHeure;
    private String description;
    private String status;
    private EmployerGetDTO employer;
    private StudentGetDTO etudiant;

    public EntrevueDTODetailed(long id, String dateHeure, String description, String status,  EmployerGetDTO employer, StudentGetDTO etudiant) {
        this.id = id;
        this.dateHeure = dateHeure;
        this.description = description;
        this.status = status;
        this.employer = employer;
        this.etudiant = etudiant;
    }
}
