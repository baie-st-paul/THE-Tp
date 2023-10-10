package com.example.tpbackend.service;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class EntrevueService {

    @Autowired
    private EntrevueRepository entrevueRepository;
    @Autowired
    private EmployerService employerService;
    @Autowired
    private StudentServices studentServices;

    public EntrevueDTO createEntrevue(EntrevueDTO entrevueDTO) {
        Entrevue entrevue = entrevueDTO.toEntrevue();
        entrevue.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(Long.valueOf(entrevueDTO.getIdEmployeur()))));
        entrevue.setStudent(StudentGetDTO.fromStudentDTO(studentServices.getStudentByMatricule(entrevueDTO.getIdEtudiant())));
        return entrevueRepository.save(entrevue).toEntrevueDTO();
    }
}
