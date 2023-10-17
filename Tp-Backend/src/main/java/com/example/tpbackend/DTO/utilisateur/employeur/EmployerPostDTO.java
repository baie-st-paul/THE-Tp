package com.example.tpbackend.DTO.utilisateur.employeur;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerPostDTO {
    private String firstName;
    private String lastName;
    private String companyName;
    private String phoneNumber;
    private String email;
    private String password;

    public static EmployerPostDTO fromEmployeur(Employer employer) {
        EmployerPostDTO employerPostDTO = new EmployerPostDTO();
        BeanUtils.copyProperties(employer, employerPostDTO);
        employerPostDTO.email = employer.getUtilisateur().getEmail();
        employerPostDTO.password = employer.getUtilisateur().getPassword();
        return employerPostDTO;
    }

    public  Employer toEmployer(EmployerPostDTO employerPostDTO) {
        Employer employer = new Employer();
        BeanUtils.copyProperties(employerPostDTO, employer);
        return employer;
    }
}
