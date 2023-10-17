package com.example.tpbackend.service.utilisateur;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public StudentPostDTO saveStudent(String firstName, String lastName, String email, String phoneNumber, String password, String role, StudentPostDTO studentPostDTO) {
        Utilisateur utilisateur = new Utilisateur(firstName, lastName, email, phoneNumber, password, role);
        Student student = studentPostDTO.toStudent(studentPostDTO);
        student.setUtilisateur(utilisateur);
        utilisateurRepository.save(utilisateur);
        studentRepository.save(student);
        return StudentPostDTO.fromStudent(student);
    }


    public void saveCv(CvDTO cvDTO) throws IOException {
        cvRepository.save(cvDTO.toCv());
    }

    public void updateCv(CvDTO cvDTO) throws IOException{
        cvRepository.updateCvWhenStudentHaveCv(cvDTO.getMatricule(),cvDTO.getFileName(),cvDTO.toCv().getFile_cv(),cvDTO.toCv().getStatus());
    }


    public StudentGetDTO getStudentByMatricule(String matricule) {
        Student student = studentRepository.findByMaticule(matricule);
        System.out.println(student);
        return Student.fromStudent(student);
    }

    public void postulerOffre(CandidaturePostDTO candidaturePostDTO) throws IOException {
        Student student = studentRepository.findByMaticule(candidaturePostDTO.getMatricule());
        Cv cv = cvRepository.findCvByMatricule(candidaturePostDTO.getMatricule());
        Optional<OffreStage> offreStage = offreStageRepository.findOffreById(candidaturePostDTO.getIdOffre());

        candidatureRepository.save(new Candidature(CvDTO.convertMultipartFileToByteArray(candidaturePostDTO.getLettre_motivation()),student,offreStage.get(),cv,candidaturePostDTO.getFileName()));
    }

    public List<CandidatureGetDTO> getMesCandidaturesByMatricule(String matricule) {
        List<Candidature> candidatureList = candidatureRepository.getAllCandidaturesByMatricule(matricule);
        System.out.println(candidatureList);
        List<CandidatureGetDTO> candidatureGetDTOList = new ArrayList<>();

        for (Candidature candidature : candidatureList) {
            CandidatureGetDTO candidatureGetDTO = candidature.toCandidatureGetDTO();
            candidatureGetDTOList.add(candidatureGetDTO);
        }

        return candidatureGetDTOList;
    }
}
