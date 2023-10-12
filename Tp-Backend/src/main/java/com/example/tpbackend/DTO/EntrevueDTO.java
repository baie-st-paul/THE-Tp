package com.example.tpbackend.DTO;

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
}
