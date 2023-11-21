package com.example.tpbackend.service;

import com.example.tpbackend.DTO.entrevue.EntrevueDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.exceptionHandler.ResourceNotFoundException;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    private OffreStageRepository offreStageRepository;

    @Transactional
    public EntrevueDTO createEntrevue(EntrevueDTO entrevueDTO) {
        Entrevue entrevue = new Entrevue();
        entrevue.setId(entrevueDTO.getId());
        entrevue.setDescription(entrevueDTO.getDescription());
        entrevue.setDateHeure(entrevueDTO.getDateHeure());
        entrevue.setStatus(Entrevue.Status.valueOf(entrevueDTO.getStatus()));
        entrevue.setStatusVuPasVuG(Entrevue.StatusVuPasVu.valueOf(entrevueDTO.getStatusVuPasVuG()));
        entrevue.setStatusVuPasVuS(Entrevue.StatusVuPasVu.valueOf(entrevueDTO.getStatusVuPasVuS()));
        entrevue.setEmployer(employerRepository.findEmployerById(Long.parseLong(entrevueDTO.getIdEmployer())));
        entrevue.setStudent(studentRepository.findByMatricule(entrevueDTO.getIdEtudiant()));
        entrevue.setOffreStage(offreStageRepository.getOffreById(Long.parseLong(entrevueDTO.getIdOffre())));
        return entrevueRepository.save(entrevue).toEntrevueDTO();
    }

    @Transactional
    public EntrevueDTO updateStatus(EntrevueDTO entrevueDTO, String newStatus){
        Entrevue entrevue = entrevueRepository.findByStudent_MatriculeAndEmployer_IdAndDateHeure(entrevueDTO.getIdEtudiant(), Long.parseLong(entrevueDTO.getIdEmployer()), entrevueDTO.getDateHeure());
        entrevue.setStatus(Entrevue.Status.valueOf(newStatus));
        return new EntrevueDTO(entrevueRepository.save(entrevue));
    }

    @Transactional
    public List<EntrevueDTO> getStudentEntrevues(String matricule){
        List<EntrevueDTO> dtos = new ArrayList<>();
        List<Entrevue> entrevues = entrevueRepository.findAllByStudent_Matricule(matricule);

        for(Entrevue e : entrevues){
            dtos.add(e.toEntrevueDTO());
        }
        return dtos;
    }

    @Transactional
    public List<EntrevueDTO> getAllEntrevuesStudentMatricule(String matricule){
        List<Entrevue> entrevues = entrevueRepository.getAllByStudentMatricule(matricule);
        List<EntrevueDTO> dtos = new ArrayList<>();

        for(Entrevue e : entrevues){
            dtos.add(e.toEntrevueDTO());
        }
        return dtos;
    }

    @Transactional
    public void manageStatusByMatricule(Long id, String newStatus) {
        entrevueRepository.updateStatusById(id,Entrevue.Status.valueOf(newStatus));
    }

    @Transactional
    public List<StudentGetDTO> getStudentsForInterviewByEmployerId(Long employerId){
        Employer employer = employerRepository.findById(employerId).orElseThrow(() -> new ResourceNotFoundException("Employer not found"));
        List<Entrevue> entrevues = entrevueRepository.findByEmployer(employer);

        // Transformation des objets Entrevue en objets Student ou StudentDTO
        return entrevues.stream().map(entrevue -> {
            Student student = entrevue.getStudent();
            return student.toStudentDTO();
        }).collect(Collectors.toList());
    }


}

