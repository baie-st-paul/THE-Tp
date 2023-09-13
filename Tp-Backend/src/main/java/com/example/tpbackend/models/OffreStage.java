package com.example.tpbackend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffreStage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String entreprise;
    private String poste;
    private String description;

    @ManyToOne
    @JoinColumn(name = "gestionnaireStage_id")
    private GestionnaireStage gestionnaireStage;


}
