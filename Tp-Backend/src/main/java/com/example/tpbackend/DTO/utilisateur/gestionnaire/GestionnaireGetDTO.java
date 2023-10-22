package com.example.tpbackend.DTO.utilisateur.gestionnaire;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GestionnaireGetDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String matricule;

    public static GestionnaireGetDTO fromGestionnaire(Gestionnaire gestionnaire) {
        if (gestionnaire == null) {
            return null;
        }

        return new GestionnaireGetDTO(
                gestionnaire.getUtilisateur().getFirstName(),
                gestionnaire.getUtilisateur().getLastName(),
                gestionnaire.getUtilisateur().getEmail(),
                gestionnaire.getUtilisateur().getPhoneNumber(),
                gestionnaire.getMatricule()
        );
    }
}
