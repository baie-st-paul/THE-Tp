package com.example.tpbackend.service;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
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


    public EntrevueDTO createEntrevue(EntrevueDTO entrevueDTO) {
        Entrevue entrevue = new Entrevue();
        entrevue.setId(1L);
        entrevue.setDescription(entrevueDTO.getDescription());
        entrevue.setDateHeure(entrevueDTO.getDateHeure());
        entrevue.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue.setEmployer(employerRepository.findEmployerById(Long.parseLong(entrevueDTO.getIdEmployeur())));
        entrevue.setStudent(studentRepository.findByMaticule(entrevueDTO.getIdEtudiant()));
        return entrevueRepository.save(entrevue).toEntrevueDTO();
    }

    public EntrevueDTO updateStatus(EntrevueDTO entrevueDTO, String newStatus){
        Entrevue entrevue = entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDateHeure(entrevueDTO.getIdEtudiant(), Long.parseLong(entrevueDTO.getIdEmployeur()), entrevueDTO.getDateHeure());
        entrevue.setStatus(Entrevue.Status.valueOf(newStatus));
        return new EntrevueDTO(entrevueRepository.save(entrevue));
    }
    public List<EntrevueDTO> getStudentEntrevues(String matricule){
        List<EntrevueDTO> dtos = new ArrayList<>();
        List<Entrevue> entrevues = entrevueRepository.findAllByStudent_Matricule(matricule);

        for(Entrevue e : entrevues){
            dtos.add(new EntrevueDTO(e));
        }

        return dtos;
    }

}
