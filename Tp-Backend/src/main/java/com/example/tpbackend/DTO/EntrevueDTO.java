package com.example.tpbackend.DTO;

import com.example.tpbackend.models.utilisateur.Entrevue;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EntrevueDTO {
    private String date;
    private String description;
    private String idEmployeur;
    private String idEtudiant;
    private String status;

    public EntrevueDTO(Entrevue entrevue){
        this.date = entrevue.getDate();
        this.description = entrevue.getDescription();
        this.idEmployeur = entrevue.getEmployer().getId() + "";
        this.idEtudiant = entrevue.getStudent().getMatricule();
        this.status = entrevue.getStatus().toString();
    }
}
