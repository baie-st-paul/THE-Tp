package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Entrevue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EntrevueDTO {
    private long id;
    private String dateHeure;
    private String description;
    private String status;
    private String idEmployeur;
    private String idEtudiant;

    public Entrevue toEntrevue() {
        return new Entrevue(
                id,
                dateHeure,
                description,
                status
        );
    }

    public EntrevueDTO(Entrevue entrevue){
        this.dateHeure = entrevue.getDateHeure();
        this.description = entrevue.getDescription();
        this.idEmployeur = entrevue.getEmployer().getId() + "";
        this.idEtudiant = entrevue.getStudent().getMatricule();
        this.status = entrevue.getStatus().toString();
    }
}
