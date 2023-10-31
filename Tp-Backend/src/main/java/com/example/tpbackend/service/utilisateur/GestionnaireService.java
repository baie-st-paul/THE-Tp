package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.EntrevueDTODetailed;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.utilisateur.employeur.EmployerGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.ContratStageRepository;
import com.example.tpbackend.repository.CandidatureRepository;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GestionnaireService {
    @Autowired
    private GestionnaireRepository gestionnaireRepository;
    @Autowired
    private UtilisateurRepository userRepository;
    @Autowired
    private OffreStageRepository offreStageRepository;
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private EntrevueRepository entrevueRepository;
    @Autowired
    private CandidatureRepository candidatureRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private ContratStageRepository contratStageRepository;
    @Autowired
    private UserService userService;

    public GestionnairePostDTO saveGestionnaire(String firstName, String lastName, String email,String phoneNumber, String password, String role, GestionnairePostDTO gestionnairePostDTO){
        if(existsByEmail(email) || existsByMatricule(gestionnairePostDTO.getMatricule())){
            return null;
        }

        Utilisateur utilisateur = new Utilisateur(firstName, lastName, email,phoneNumber, password, role);
        Gestionnaire gestionnaire = new Gestionnaire(gestionnairePostDTO.getMatricule());
        gestionnaire.setUtilisateur(utilisateur);
        System.out.println(utilisateur.getEmail() + ", " + utilisateur.getPassword() + ", " + utilisateur.getRole());
        userRepository.save(utilisateur);
        gestionnaireRepository.save(gestionnaire);

        return GestionnairePostDTO.fromGestionnaire(gestionnaire);
    }

    public GestionnairePostDTO saveGestionnaire(GestionnairePostDTO gestionnaireDTO) {
        gestionnaireRepository.save(gestionnaireDTO.toGestionnaire(gestionnaireDTO));
        userRepository.save(gestionnaireDTO.toGestionnaire(gestionnaireDTO).getUtilisateur());
        return gestionnaireDTO;
    }

    public boolean existsByMatricule(String matricule){
        return gestionnaireRepository.existsByMatricule(matricule);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public boolean existsByMatriculeOrEmail(String matricule, String email){
        return gestionnaireRepository.existsByMatriculeOrEmail(matricule, email);
    }

    public ArrayList<OffreStageDTO> getToutesLesOffres() {
        List<OffreStage> offreStages = offreStageRepository.findAll();
        ArrayList<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }

        return offreStageDTOS;
    }

    public void updateOffreStatus(String titre,String status) {
        offreStageRepository.updateOffreStatusByTitre(titre, OffreStage.Status.valueOf(status));
    }

    public List<CvDTO> getAllCvs() {
        List<Cv> cvs = cvRepository.findAll();
        List<CvDTO> cvDTOS = new ArrayList<>();

        for (Cv cv: cvs) {
            cvDTOS.add(cv.toCvDTO());
        }
        return cvDTOS;
    }

    public List<CvDTO> getAllCvsByFileName(String fileName) {
        List<Cv> cvs = cvRepository.getAllByFileName(fileName);
        List<CvDTO> cvDTOS = new ArrayList<>();

        for (Cv cv: cvs) {
            cvDTOS.add(cv.toCvDTO());
        }
        return cvDTOS;
    }

    public void updateCvStatus(String matricule,String status) {
        cvRepository.updateCvStatusByMatricule(matricule, Cv.StatusCV.valueOf(status));
    }
    public List<EntrevueDTODetailed> getStudentsWithEntrevue() {
        List<Entrevue> entrevues = entrevueRepository.findAll();
        List<EntrevueDTODetailed> dtoEntrevue = new ArrayList<>();
        for(Entrevue e : entrevues){
           EntrevueDTODetailed entrevue = new EntrevueDTODetailed(
                    e.getId(),
                    e.getDateHeure(),
                    e.getDescription(),
                    e.getStatus().toString(),
                    new EmployerGetDTO(),
                    new StudentGetDTO()
            );
           entrevue.getEtudiant().setFirstName(e.getStudent().getUtilisateur().getFirstName());
           entrevue.getEtudiant().setLastName(e.getStudent().getUtilisateur().getLastName());
           entrevue.getEtudiant().setMatricule(e.getStudent().getMatricule());
           entrevue.getEmployer().setCompanyName(e.getEmployer().getCompanyName());
           dtoEntrevue.add(entrevue);
        }
        System.out.println(entrevues.size());
       return dtoEntrevue;
    }

    @Transactional
    public ContratStageDTO createContrat(ContratStageDTO contratStageDTO) {
        Student student = studentRepository.findById(Long.valueOf(contratStageDTO.getStudentId()))
                .orElseThrow(() -> new RuntimeException("L'étudiant avec l'ID " + contratStageDTO.getStudentId() + " n'a pas été trouvé."));

        Employer employer = employerRepository.findById(contratStageDTO.getEmployerId())
                .orElseThrow(() -> new RuntimeException("L'employeur avec l'ID " + contratStageDTO.getEmployerId() + " n'a pas été trouvé."));

        ContratStage contratStage = contratStageDTO.toContratStage();

        contratStage.setStudent(student);
        contratStage.setEmployeur(employer);

        ContratStage contratStageSaved = contratStageRepository.save(contratStage);

        return ContratStageDTO.fromContratStage(contratStageSaved);
    }

    @Transactional
    public List<CandidatureDTO> getCandidaturesAcceptees() {
        List<Candidature> candidaturesAcceptees = candidatureRepository.findByStatus(Candidature.Status.Accepted);
        return candidaturesAcceptees.stream().map(CandidatureDTO::fromCandidature).collect(Collectors.toList());
    }

    public GestionnaireGetDTO getGestionnaireByAuthentication(){
        Gestionnaire gestionnaire = gestionnaireRepository.findByUtilisateurId(userService.getUserId());
        return GestionnaireGetDTO.fromGestionnaire(gestionnaire);
    }
}



