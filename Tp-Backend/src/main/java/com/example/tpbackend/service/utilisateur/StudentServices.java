package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
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
import java.util.List;
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

    public StudentPostDTO saveStudent(StudentPostDTO studentPostDTO, String email, String password, String role){
        Utilisateur utilisateur = new Utilisateur(email, password,role);
        Student student = studentPostDTO.toStudent(studentPostDTO);
        student.setUtilisateur(utilisateur);
        utilisateurRepository.save(utilisateur);
        studentRepository.save(student);
        return StudentPostDTO.fromStudent(student);
    }

    public boolean existsByMatriculeOrEmail(String matricule, String email){
        return studentRepository.existsByMatriculeOrEmail(matricule, email);
    }

    public void saveCv(CvDTO cvDTO) throws IOException {
        cvRepository.save(cvDTO.toCv());
    }

    public void updateCv(CvDTO cvDTO) throws IOException{
        cvRepository.updateCvWhenStudentHaveCv(cvDTO.getMatricule(),cvDTO.getFileName(),cvDTO.toCv().getFile_cv(),cvDTO.toCv().getStatus());
    }

    public StudentGetDTO getStudentByUser(UtilisateurDTO utilisateurDTO){
        Student student = studentRepository.findStudentByUtilisateur(utilisateurDTO.getEmail());
        return new StudentGetDTO(
                student.getFirstName(),student.getLastName(),utilisateurDTO.getEmail(),
                student.getPhoneNumber(),student.getMatricule(),student.getProgram()
        );
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

    public List<CandidatureDTO> getListCandidatureByOfffreId(Long id){
        return candidatureRepository.findByOffreStageId(id)
                .stream()
                .map(CandidatureDTO::fromCandidature)
                .collect(Collectors.toList());
    }
}
