package com.example.tpbackend.service;

import com.example.tpbackend.DTO.EntrevueDTO;
import com.example.tpbackend.models.utilisateur.Entrevue;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EntrevueService {
    private final EntrevueRepository entrevueRepository;
    private final EmployerRepository employerRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public EntrevueDTO createEntrevue(EntrevueDTO entrevueDTO) throws Exception {
        Optional<Employer> employer = employerRepository.findById(Integer.parseInt(entrevueDTO.getIdEmployeur()));
        Optional<Student> student = studentRepository.findById(Integer.parseInt(entrevueDTO.getIdEtudiant()));
        if(employer.isEmpty() || student.isEmpty()) throw new Exception("Interview not valid");
        Entrevue entrevue = new Entrevue(entrevueDTO.getDate(), employer.get(), student.get(), entrevueDTO.getDescription());
        return new EntrevueDTO(entrevueRepository.save(entrevue));
    }

    @Transactional
    public EntrevueDTO updateStatus(EntrevueDTO entrevueDTO, String newStatus){
        Entrevue entrevue = entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDate(entrevueDTO.getIdEtudiant(), Long.parseLong(entrevueDTO.getIdEmployeur()), entrevueDTO.getDate());
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
