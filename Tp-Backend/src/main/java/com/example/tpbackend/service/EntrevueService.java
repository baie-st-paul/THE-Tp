package com.example.tpbackend.service;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
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
    private EmployerRepository employerRepository;

    @Autowired
    private StudentRepository studentRepository;


    public EntrevueDTO createEntrevue(EntrevueDTO entrevueDTO) throws Exception {
        Entrevue entrevue = new Entrevue();
        entrevue.setId(1L);
        entrevue.setDescription(entrevueDTO.getDescription());
        entrevue.setDateHeure(entrevueDTO.getDateHeure());
        entrevue.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue.setEmployer(employerRepository.findEmployerById(Long.parseLong(entrevueDTO.getIdEmployeur())));
        entrevue.setStudent(studentRepository.findByMaticule(entrevueDTO.getIdEtudiant()));
        return entrevueRepository.save(entrevue).toEntrevueDTO();
    }

}
