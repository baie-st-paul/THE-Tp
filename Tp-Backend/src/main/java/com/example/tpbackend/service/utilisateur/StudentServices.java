package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.CandidatureRepository;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import jakarta.transaction.Transactional;
import com.example.tpbackend.service.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServices {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private OffreStageRepository offreStageRepository;
    @Autowired
    private CandidatureRepository candidatureRepository;
    @Autowired
    private UserService userService;


    public StudentPostDTO saveStudent(String firstName, String lastName, String email, String phoneNumber, String password, String role, StudentPostDTO studentPostDTO) {
        Utilisateur utilisateur = new Utilisateur(firstName, lastName, email, phoneNumber, password, role);
        Student student = new Student(studentPostDTO.getMatricule(), studentPostDTO.getProgram(), utilisateur);
        utilisateurRepository.save(utilisateur);
        studentRepository.save(student);
        return StudentPostDTO.fromStudent(student);
    }

    @Transactional
    public void saveCv(CvDTO cvDTO) throws IOException {
        cvRepository.save(cvDTO.toCv());
    }

    @Transactional
    public StudentGetDTO getStudentByAuthentication(){
        Student student = studentRepository.findByUtilisateurId(userService.getUserId());
        System.out.println(student);
        return Student.fromStudent(student);
    }

    @Transactional
    public void updateCv(CvDTO cvDTO) throws IOException{
        cvRepository.updateCvWhenStudentHaveCv(cvDTO.getMatricule(),cvDTO.getFileName(),cvDTO.toCv().getFile_cv(),cvDTO.toCv().getStatus());
    }

    @Transactional
    public StudentGetDTO getStudentByMatricule(String matricule) {
        Student student = studentRepository.findByMatricule(matricule);
        return Student.fromStudent(student);
    }

    @Transactional
    public void postulerOffre(CandidaturePostDTO candidaturePostDTO) throws IOException {
        Student student = studentRepository.findByMatricule(candidaturePostDTO.getMatricule());
        Cv cv = cvRepository.findCvByMatricule(candidaturePostDTO.getMatricule());
        Optional<OffreStage> offreStage = offreStageRepository.findOffreById(candidaturePostDTO.getIdOffre());

        candidatureRepository.save(new Candidature(CvDTO.convertMultipartFileToByteArray(candidaturePostDTO.getLettre_motivation()),
                student,offreStage.get(),cv,candidaturePostDTO.getFileName(), Candidature.Status.valueOf("In_review")));
    }

    @Transactional
    public List<CandidatureGetDTO> getMesCandidaturesByMatricule(String matricule) {
        List<Candidature> candidatureList = candidatureRepository.getAllCandidaturesByMatricule(matricule);
        System.out.println(candidatureList);
        List<CandidatureGetDTO> candidatureGetDTOList = new ArrayList<>();

        for (Candidature candidature : candidatureList) {
            candidatureGetDTOList.add(candidature.toCandidatureGetDTO());
        }

        return candidatureGetDTOList;
    }

    @Transactional
    public List<CandidatureDTO> getListCandidatureByOffreId(Long id){
        return candidatureRepository.findByOffreStageId(id)
                .stream()
                .map(CandidatureDTO::fromCandidature)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateCandidatureStatus(String matricule, String status) {
        candidatureRepository.updateCandidatureStatusByMatricule(matricule, Candidature.Status.valueOf(status));
    }
}
