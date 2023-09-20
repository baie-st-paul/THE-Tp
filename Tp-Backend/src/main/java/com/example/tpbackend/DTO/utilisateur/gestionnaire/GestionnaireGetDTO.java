package com.example.tpbackend.DTO.utilisateur.gestionnaire;


import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class GestionnaireGetDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String matricule;

    public GestionnaireGetDTO(String firstName, String lastName, String matricule, String phoneNumber, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.matricule = matricule;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public static GestionnaireGetDTO fromGestionnaire(Gestionnaire gestionnaire){
        GestionnaireGetDTO gestionnaireGetDTO = new GestionnaireGetDTO();
        BeanUtils.copyProperties(gestionnaire, gestionnaireGetDTO);
        return gestionnaireGetDTO;
    }

    public Gestionnaire toGestionnaire(GestionnaireGetDTO gestionnaireGetDTO) {
        Gestionnaire gestionnaire = new Gestionnaire();
        BeanUtils.copyProperties(gestionnaireGetDTO, gestionnaire);
        return gestionnaire;
    }
}

