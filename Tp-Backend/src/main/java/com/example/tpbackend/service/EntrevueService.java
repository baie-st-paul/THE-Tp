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
        entrevue.setEmployer(employerRepository.findEmployerById(Long.parseLong(entrevueDTO.getIdEmployer())));
        entrevue.setStudent(studentRepository.findByMaticule(entrevueDTO.getIdEtudiant()));
        return entrevueRepository.save(entrevue).toEntrevueDTO();
    }

    
    public EntrevueDTO updateStatus(EntrevueDTO entrevueDTO, String newStatus){
        Entrevue entrevue = entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDateHeure(entrevueDTO.getIdEtudiant(), Long.parseLong(entrevueDTO.getIdEmployer()), entrevueDTO.getDateHeure());
        entrevue.setStatus(Entrevue.Status.valueOf(newStatus));
        return new EntrevueDTO(entrevueRepository.save(entrevue));
    }

    public List<EntrevueDTO> getStudentEntrevues(String matricule){
        List<EntrevueDTO> dtos = new ArrayList<>();
        List<Entrevue> entrevues = entrevueRepository.findAllByStudent_Matricule(matricule);

        for(Entrevue e : entrevues){
            dtos.add(e.toEntrevueDTO());
        }

        return dtos;
    }

    public List<EntrevueDTO> getAllEntrevuesStudentMatricule(String matricule){
        List<Entrevue> entrevues = entrevueRepository.getAllByStudentMatricule(matricule);
        List<EntrevueDTO> dtos = new ArrayList<>();

        for(Entrevue e : entrevues){
            dtos.add(e.toEntrevueDTO());
        }
        return dtos;
    }

    public void manageStatusByMatricule(String matricule, String newStatus) {
        entrevueRepository.updateStatusByMatricule(matricule,Entrevue.Status.valueOf(newStatus));
    }
}

