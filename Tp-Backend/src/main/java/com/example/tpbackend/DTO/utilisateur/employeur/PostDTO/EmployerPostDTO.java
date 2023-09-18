package com.example.tpbackend.DTO.utilisateur.employeur.PostDTO;

import com.example.tpbackend.models.utilisateur.Employer;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class EmployerPostDTO {
    private String compagnyId;
    private String firstName;
    private String lastName;
    private String companyName;
    private String phoneNumber;
    private String email;
    private String password;

    public EmployerPostDTO(String compagnyId,
                           String firstName,
                           String lastName,
                           String companyName,
                           String phoneNumber,
                           String email,
                           String password) {
        this.compagnyId = compagnyId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }

    public Employer fromEmployerDTO(EmployerPostDTO employerPostDTO){
        Employer employer = new Employer();
        BeanUtils.copyProperties(employerPostDTO, employer);
        return employer;
    }

    public static EmployerPostDTO fromEmployer(Employer employer) {
        EmployerPostDTO employerPostDTO = new EmployerPostDTO();
        BeanUtils.copyProperties(employer, employerPostDTO);
        return employerPostDTO;
    }

    public Employer toEmployer(){
        Employer employer = new Employer();
        BeanUtils.copyProperties(this, employer);
        employer.setUtilisateur(new Utilisateur(this.email, this.password, ""));
        return employer;
    }

}
