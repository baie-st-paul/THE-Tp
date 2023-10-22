package com.example.tpbackend.DTO.utilisateur.employeur;

import com.example.tpbackend.models.utilisateur.employeur.Employer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.LinkedHashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerPostDTO {
    private String companyName;


    public static EmployerPostDTO fromEmployeur(Employer employer) {
        EmployerPostDTO employerPostDTO = new EmployerPostDTO();
        BeanUtils.copyProperties(employer, employerPostDTO);
        return employerPostDTO;
    }

    public static EmployerPostDTO fromHashMap(LinkedHashMap<?,?> linkedHashMap) {
        EmployerPostDTO employerPostDTO = new EmployerPostDTO();
        employerPostDTO.setCompanyName(linkedHashMap.get("companyName").toString());
        return employerPostDTO;
    }

    public static Employer toEmployer(EmployerPostDTO employerPostDTO){
        Employer employer = new Employer();
        BeanUtils.copyProperties(employerPostDTO, employer);
        return employer;
    }
}
