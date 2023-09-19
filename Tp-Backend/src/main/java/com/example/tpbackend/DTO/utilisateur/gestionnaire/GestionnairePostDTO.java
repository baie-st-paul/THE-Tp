package com.example.tpbackend.DTO.utilisateur.gestionnaire;

import com.example.tpbackend.models.utilisateur.Gestionnaire;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class GestionnairePostDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String matricule;

    public GestionnairePostDTO(
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
