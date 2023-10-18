package com.example.tpbackend.DTO.utilisateur.gestionnaire;

import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.LinkedHashMap;

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

    public static GestionnairePostDTO fromHashMap(LinkedHashMap linkedHashMap) {
        GestionnairePostDTO gestionnairePostDTO = new GestionnairePostDTO();
        gestionnairePostDTO.setMatricule(linkedHashMap.get("matricule").toString());
        return gestionnairePostDTO;
    }

    public Gestionnaire toGestionnaire(GestionnairePostDTO gestionnaireDTO) {
        Gestionnaire gestionnaire = new Gestionnaire();
        BeanUtils.copyProperties(gestionnaireDTO, gestionnaire);
        return gestionnaire;
    }
}
