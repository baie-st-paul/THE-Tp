package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.candidature.CandidatureGetDTO;
import com.example.tpbackend.DTO.candidature.CandidaturePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentPostDTO;
import com.example.tpbackend.models.*;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.*;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.TagGenerator;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Data
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
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ContratStageRepository contratStageRepository;
    @Autowired
    private EntrevueRepository entrevueRepository;

    public StudentPostDTO saveStudent(String firstName, String lastName, String email, String phoneNumber, String password, String role, StudentPostDTO studentPostDTO) {
        Utilisateur utilisateur = new Utilisateur(firstName, lastName, email, phoneNumber, password, role);
        Student student = new Student(studentPostDTO.getMatricule(), studentPostDTO.getProgram(), utilisateur);
            if (tagRepository.existsByTagName(getTag().getTagName())) {
                student.setTagName(getTag().getTagName());
            }else{
                student.setTagName(getTag().getTagName());
                tagRepository.save(new Tag(getTag().getTagName()));
            }
        utilisateurRepository.save(utilisateur);
        studentRepository.save(student);
        return StudentPostDTO.fromStudent(student);
    }

    @Transactional
    public void saveCv(CvDTO cvDTO) throws IOException {
        cvRepository.save(cvDTO.toCv());
    }

    @Transactional
    public void updateStatusOffreVuS(String titre, OffreStage.StatusVuPasVu statusVuPasVu) {
        offreStageRepository.updateOffreStatusVuPasVuSByTitre(titre, statusVuPasVu);
    }

    @Transactional
    public void updateStatusEntrevueVuS(String matricule, Entrevue.StatusVuPasVu statusVuPasVu) {
        entrevueRepository.updateStatusVuPasVuSByMatricule(matricule, statusVuPasVu);
    }

    @Transactional
    public void updateStatusContratVuS(String matricule, ContratStage.StatusVuPasVu statusVuPasVu) {
        contratStageRepository.updateStatusVuPasVuSByMatricule(matricule, statusVuPasVu);
    }

    @Transactional
    public CvDTO getCvByMatricule(String matricule) {
        Cv cv = cvRepository.findCvByMatricule(matricule);
        return cv.toCvDTO();
    }

    @Transactional
    public StudentGetDTO getStudentByAuthentication(){
        Student student = studentRepository.findByUtilisateurId(userService.getUserId());
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
        Candidature candidature = new Candidature(CvDTO.convertMultipartFileToByteArray(candidaturePostDTO.getLettre_motivation()),
                student,offreStage.get(),cv,candidaturePostDTO.getFileName(),
                Candidature.Status.valueOf("In_review"),
                Candidature.StatusVuPasVu.valueOf("pasVu"),
                Candidature.StatusVuPasVu.valueOf("pasVu"));
        if (tagRepository.existsByTagName(getTag().getTagName())) {
            candidature.setTagName(getTag().getTagName());
        }else{
            candidature.setTagName(getTag().getTagName());
            tagRepository.save(new Tag(getTag().getTagName()));
        }
        candidatureRepository.save(candidature);
    }

    @Transactional
    public List<CandidatureGetDTO> getMesCandidaturesByMatricule(String matricule) {
        List<Candidature> candidatureList = candidatureRepository.getAllCandidaturesByMatricule(matricule);
        //System.out.println(candidatureList);
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

    public Tag getTag(){
        return new Tag(TagGenerator.getCurrentSession());
    }

    @Transactional
    public List<Object> checkCurrentSession(String matricule) {
        List<Object> response = new ArrayList<>();
        Tag currentTag = new Tag(TagGenerator.getCurrentSession());
        Tag studenTag = new Tag(studentRepository.findTagNameByMatricule(matricule));
        boolean isSameTag;
        if(currentTag.getTagName().equals(studenTag.getTagName())){
            isSameTag = true;
        }
        else{
            isSameTag = false;
        }
        response.add(currentTag.getTagName());
        response.add(studenTag.getTagName());
        response.add(isSameTag);
        return response;
    }

    public void reinscriptionANouvelleSession(String matricule){
        studentRepository.updateTagNameByMatricule(matricule,TagGenerator.getCurrentSession());
    }

    public void updateTag(String matricule, String tag){
        studentRepository.updateTagNameByMatricule(matricule,tag);
    }

    @Transactional
    public void signContract(ContratStageDTO contractDTO) throws Exception {
        Optional<ContratStage> optionalContract = contratStageRepository.findById(contractDTO.getId());
        if(optionalContract.isEmpty()) throw new Exception("Contract not found");
        ContratStage contract = optionalContract.get();
        contract.setStatutEtudiant(ContratStage.Statut.Signer);
        contratStageRepository.save(contract);
    }

    @Transactional
    public List<ContratStageDTO> getContratByStudent(String studentId){
        List<ContratStage> studentContracts = contratStageRepository.findByStudentMatricule(studentId);
        return studentContracts.stream().map(ContratStageDTO::fromContratStage).collect(Collectors.toList());
    }
}
