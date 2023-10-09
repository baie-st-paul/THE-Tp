package com.example.tpbackend.DTO;

import com.example.tpbackend.models.Entrevue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
