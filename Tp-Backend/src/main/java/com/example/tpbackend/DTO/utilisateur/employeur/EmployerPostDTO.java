package com.example.tpbackend.DTO.utilisateur.employeur;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
public class EmployerPostDTO {
    private String companyName;

    public EmployerPostDTO(String companyName) {
        this.companyName = companyName;
    }


    public static EmployerPostDTO fromEmployeur(Employer employer) {
        EmployerPostDTO employerPostDTO = new EmployerPostDTO();
        BeanUtils.copyProperties(employer, employerPostDTO);
        return employerPostDTO;
    }

    public static Employer fromEmployerDTO(EmployerPostDTO employerPostDTO){
        Employer employer = new Employer();
        BeanUtils.copyProperties(employerPostDTO, employer);
        return employer;
    }

    public  Employer toEmployer(EmployerPostDTO employerPostDTO) {
        Employer employer = new Employer();
        BeanUtils.copyProperties(employerPostDTO, employer);
        return employer;
    }

}
