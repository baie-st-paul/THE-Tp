package com.example.tpbackend.DTO.utilisateur.gestionnaire;

import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class GestionnairePostDTO {

    private String matricule;

    public GestionnairePostDTO(String matricule) {
        this.matricule = matricule;
    }

    public static GestionnairePostDTO fromGestionnaire(Gestionnaire gestionnaire){
        GestionnairePostDTO gestionnaireDTO = new GestionnairePostDTO();
        BeanUtils.copyProperties(gestionnaire, gestionnaireDTO);
        return gestionnaireDTO;
    }

    public Gestionnaire toGestionnaire(GestionnairePostDTO gestionnaireDTO) {
        Gestionnaire gestionnaire = new Gestionnaire();
        BeanUtils.copyProperties(gestionnaireDTO, gestionnaire);
        return gestionnaire;
    }
}
