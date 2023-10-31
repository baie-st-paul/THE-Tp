package com.example.tpbackend.DTO.utilisateur.employeur;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerGetDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String companyName;


    public static EmployerGetDTO fromEmployer(Employer employer) {
        if (employer == null) {
            return null;
        }

        return new EmployerGetDTO(
                employer.getId(),
                employer.getUtilisateur().getFirstName(),
                employer.getUtilisateur().getLastName(),
                employer.getUtilisateur().getEmail(),
                employer.getUtilisateur().getPhoneNumber(),
                employer.getCompanyName()
        );
    }
}
