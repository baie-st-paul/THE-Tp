package com.example.tpbackend.DTO.utilisateur.employeur;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerGetDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String companyName;
    private String phoneNumber;
    private String email;

    public static Employer fromEmployerDTO(EmployerGetDTO employerGetDTO){
        Employer employer = new Employer();
        BeanUtils.copyProperties(employerGetDTO, employer);
        return employer;
    }
}
