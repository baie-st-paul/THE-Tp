package com.example.tpbackend.DTO.utilisateur.employeur.GetDTO;

import com.example.tpbackend.models.utilisateur.Employer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class EmployerGetDTO {

    private String firstName;
    private String lastName;
    private String companyName;
    private String phoneNumber;
    private String email;


    public EmployerGetDTO(String firstName, String lastName, String companyName, String phoneNumber, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}
