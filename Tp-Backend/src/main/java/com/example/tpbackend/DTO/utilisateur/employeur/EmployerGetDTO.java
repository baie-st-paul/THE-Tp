package com.example.tpbackend.DTO.utilisateur.employeur;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmployerGetDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String companyName;
    private String phoneNumber;
    private String email;

    public EmployerGetDTO(long id, String firstName, String lastName, String companyName, String phoneNumber, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}
