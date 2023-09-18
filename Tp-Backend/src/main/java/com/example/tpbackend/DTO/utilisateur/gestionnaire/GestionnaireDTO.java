package com.example.tpbackend.DTO.utilisateur.gestionnaire;

import com.example.tpbackend.models.utilisateur.Gestionnaire;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class GestionnaireDTO {

    private String matricule;
    private String email;
    private String password;

    public static GestionnaireDTO fromGestionnaire(Gestionnaire gestionnaire){
        GestionnaireDTO gestionnaireDTO = new GestionnaireDTO();
        BeanUtils.copyProperties(gestionnaire, gestionnaireDTO);
        return gestionnaireDTO;
    }
}
