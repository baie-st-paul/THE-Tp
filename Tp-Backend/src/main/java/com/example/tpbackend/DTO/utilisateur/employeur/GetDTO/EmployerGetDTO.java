package com.example.tpbackend.DTO.utilisateur.employeur.GetDTO;

import com.example.tpbackend.models.utilisateur.Employer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class EmployerGetDTO {

    private String companyId;
    private String firstName;
    private String lastName;
    private String companyName;
    private String phoneNumber;
    private String email;


    public EmployerGetDTO(String companyId, String firstName, String lastName, String companyName, String phoneNumber, String email) {
        this.companyId = companyId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }



    public static EmployerGetDTO fromEmployer(Employer employer) {
        EmployerGetDTO employerGetDTO = new EmployerGetDTO();
        BeanUtils.copyProperties(employer, employerGetDTO);
        employerGetDTO.setEmail(employer.getUtilisateur().getEmail());
        return employerGetDTO;
    }
}
