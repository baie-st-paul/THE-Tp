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
    private String companyName;
    private String idEmployer;
    private String idEtudiant;

    public EntrevueDTO(Entrevue entrevue){
        this.id = entrevue.getId();
        this.dateHeure = entrevue.getDateHeure();
        this.description = entrevue.getDescription();
        this.idEmployer = entrevue.getEmployer().getId() + "";
        this.companyName = entrevue.getEmployer().getCompanyName();
        this.idEtudiant = entrevue.getStudent().getMatricule();
        this.status = entrevue.getStatus().toString();
    }

    public void setIdEmployeur(String number) {
        this.idEmployer = number;
    }


}
