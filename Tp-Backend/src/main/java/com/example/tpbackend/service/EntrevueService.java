package com.example.tpbackend.service;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.service.utilisateur.EmployerService;
import com.example.tpbackend.service.utilisateur.StudentServices;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@NoArgsConstructor
public class EntrevueService {

    @Autowired
    private EntrevueRepository entrevueRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EmployerService employerService;

    @Autowired
    private StudentServices studentServices;

    public EntrevueDTO createEntrevue(EntrevueDTO entrevueDTO) throws Exception {
        Entrevue entrevue = entrevueDTO.toEntrevue();
        entrevue.setEmployer(EmployerGetDTO.fromEmployerDTO(employerService.getEmployerById(Long.valueOf(entrevueDTO.getIdEmployeur()))));
        entrevue.setStudent(StudentGetDTO.fromStudentDTO(studentServices.getStudentByMatricule(entrevueDTO.getIdEtudiant())));
        return entrevueRepository.save(entrevue).toEntrevueDTO();
    }

    public EntrevueDTO updateStatus(EntrevueDTO entrevueDTO, String newStatus){
        Entrevue entrevue = entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDateHeure(entrevueDTO.getIdEtudiant(), Long.parseLong(entrevueDTO.getIdEmployeur()), entrevueDTO.getDateHeure());
        entrevue.setStatus(Entrevue.Status.valueOf(newStatus));
        return new EntrevueDTO(entrevueRepository.save(entrevue));
    }


    public List<EntrevueDTO> getEntrevueByStudent(String matricule){
        List<EntrevueDTO> entrevues = new ArrayList<>();
        for(Entrevue e : entrevueRepository.findAllByStudent_Matricule(matricule)){
            entrevues.add(new EntrevueDTO(e));
        }
        return entrevues;
    }

    public List<EntrevueDTO> getEntrevueByEmployer(Long id){
        List<EntrevueDTO> entrevues = new ArrayList<>();
        for(Entrevue e : entrevueRepository.findAllByEmployer_Id(id)){
            entrevues.add(new EntrevueDTO(e));
        }
        return entrevues;
    }

}
