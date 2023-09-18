package com.example.tpbackend.DTO.utilisateur.gestionnaire;

import com.example.tpbackend.models.utilisateur.Gestionnaire;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class GestionnaireDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String matricule;

    public GestionnaireDTO(
            String firstName,
            String lastName,
            String matricule,
            String phoneNumber,
            String email,
            String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.matricule = matricule;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

    public static GestionnaireDTO fromGestionnaire(Gestionnaire gestionnaire){
        GestionnaireDTO gestionnaireDTO = new GestionnaireDTO();
        BeanUtils.copyProperties(gestionnaire, gestionnaireDTO);
        return gestionnaireDTO;
    }

    public Gestionnaire toGestionnaire(GestionnaireDTO gestionnaireDTO) {
        Gestionnaire gestionnaire = new Gestionnaire();
        BeanUtils.copyProperties(gestionnaireDTO, gestionnaire);
        return gestionnaire;
    }
}
