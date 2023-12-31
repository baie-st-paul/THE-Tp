package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.*;
import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTO;
import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTODetails;
import com.example.tpbackend.DTO.candidature.CandidatureDTODetailed;
import com.example.tpbackend.DTO.entrevue.EntrevueDTODetailed;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.models.*;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.*;
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
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private GenerateContratPDFRepository generateContratPDFRepository;
    @Autowired
    private EvaluationMilieuStageRepository evaluationMilieuStageRepository;

    public GestionnairePostDTO saveGestionnaire(String firstName, String lastName, String email,String phoneNumber, String password, String role, GestionnairePostDTO gestionnairePostDTO){
        if(existsByEmail(email) || existsByMatricule(gestionnairePostDTO.getMatricule())){
            return null;
        }

        Utilisateur utilisateur = new Utilisateur(firstName, lastName, email,phoneNumber, password, role);
        Gestionnaire gestionnaire = new Gestionnaire(gestionnairePostDTO.getMatricule());
        gestionnaire.setUtilisateur(utilisateur);
        userRepository.save(utilisateur);
        gestionnaireRepository.save(gestionnaire);

        return GestionnairePostDTO.fromGestionnaire(gestionnaire);
    }

    public GestionnairePostDTO saveGestionnaire(GestionnairePostDTO gestionnaireDTO) {
        gestionnaireRepository.save(gestionnaireDTO.toGestionnaire(gestionnaireDTO));
        userRepository.save(gestionnaireDTO.toGestionnaire(gestionnaireDTO).getUtilisateur());
        return gestionnaireDTO;
    }

    @Transactional
    public boolean existsByMatricule(String matricule){
        return gestionnaireRepository.existsByMatricule(matricule);
    }

    @Transactional
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public boolean existsByMatriculeOrEmail(String matricule, String email){
        return gestionnaireRepository.existsByMatriculeOrEmail(matricule, email);
    }

    @Transactional
    public ArrayList<OffreStageDTO> getToutesLesOffres() {
        List<OffreStage> offreStages = offreStageRepository.findAll();
        ArrayList<OffreStageDTO> offreStageDTOS = new ArrayList<>();

        for (OffreStage offreStage: offreStages) {
            offreStageDTOS.add(offreStage.toOffreStageDTO());
        }

        return offreStageDTOS;
    }

    @Transactional
    public void updateOffreStatus(String titre,String status) {
        offreStageRepository.updateOffreStatusByTitre(titre, OffreStage.Status.valueOf(status));
    }

    @Transactional
    public List<CvDTO> getAllCvs() {
        List<Cv> cvs = cvRepository.findAll();
        List<CvDTO> cvDTOS = new ArrayList<>();

        for (Cv cv: cvs) {
            cvDTOS.add(cv.toCvDTO());
        }
        return cvDTOS;
    }

    @Transactional
    public List<CvDTO> getAllCvsByFileName(String fileName) {
        List<Cv> cvs = cvRepository.getAllByFileName(fileName);
        List<CvDTO> cvDTOS = new ArrayList<>();

        for (Cv cv: cvs) {
            cvDTOS.add(cv.toCvDTO());
        }
        return cvDTOS;
    }

    @Transactional
    public void updateCvStatus(String matricule,String status) {
        cvRepository.updateCvStatusByMatricule(matricule, Cv.Status.valueOf(status));
    }

    @Transactional
    public List<EntrevueDTODetailed> getStudentsWithEntrevue() {
        List<Entrevue> entrevues = entrevueRepository.findAll();
        return entrevues.stream().map(EntrevueDTODetailed::toEntrevueDTODetailed).collect(Collectors.toList());
    }

    @Transactional
    public ContratStageDTODetails createContrat(ContratStageDTO contratStageDTO) {
        Candidature candidature = candidatureRepository.getReferenceById(contratStageDTO.getCandidatureId());
        ContratStage contratStage = contratStageDTO.toContratStage();
        contratStage.setCandidature(candidature);

        contratStage.setNomDePoste(candidature.getOffreStage().getTitre());

        contratStage.setStatutGestionnaire(ContratStage.Statut.valueOf(contratStageDTO.getStatutGestionnaire()));
        contratStage.setStatutEtudiant(ContratStage.Statut.valueOf(contratStageDTO.getStatutEtudiant()));
        contratStage.setStatutEmployeur(ContratStage.Statut.valueOf(contratStageDTO.getStatutEmployeur()));

        contratStage.setStatutVuPasVuS(ContratStage.StatusVuPasVu.valueOf(contratStageDTO.getStatusVuPasVuG()));
        contratStage.setStatutVuPasVuG(ContratStage.StatusVuPasVu.valueOf(contratStageDTO.getStatusVuPasVuG()));
        contratStage.setStatutVuPasVuE(ContratStage.StatusVuPasVu.valueOf(contratStageDTO.getStatusVuPasVuS()));

        ContratStage contratStageSaved = contratStageRepository.save(contratStage);

        return ContratStageDTODetails.fromContratStage(contratStageSaved);
    }

    @Transactional
    public List<ContratStageDTO> getAllContrats() {
        List<ContratStage> contratStages = contratStageRepository.findAll();
        return contratStages.stream().map(ContratStageDTO::fromContratStage).collect(Collectors.toList());
    }

    public List<ContratStageDTODetails> getAllContratsDetails() {
        List<ContratStage> contratStages = contratStageRepository.findAll();
        return contratStages.stream().map(ContratStageDTODetails::fromContratStage).collect(Collectors.toList());
    }

    @Transactional
    public List<CandidatureDTODetailed> getCandidaturesAcceptees() {
        List<Candidature> candidaturesAcceptees = candidatureRepository.findByStatus(Candidature.Status.Accepted);
        return candidaturesAcceptees.stream().map(CandidatureDTODetailed::fromCandidature).collect(Collectors.toList());
    }

    @Transactional
    public Optional<Candidature> getOffreStageEtudiantEmbauche(Student student){
        return candidatureRepository.findByStatusAndStudent(Candidature.Status.Accepted,student);
    }

    @Transactional
    public GestionnaireGetDTO getGestionnaireByAuthentication(){
        Gestionnaire gestionnaire = gestionnaireRepository.findByUtilisateurId(userService.getUserId());
        return GestionnaireGetDTO.fromGestionnaire(gestionnaire);
    }

    public List<TagDTO> getAllTags(){
        List<TagDTO> tagsDtos = new ArrayList<>();
        List<Tag> listAllTags = tagRepository.findAll();
        for (Tag tag: listAllTags) {
            tagsDtos.add(tag.toTagDTO());
        }
        return tagsDtos;
    }

    @Transactional
    public ContratStageDTO signContract(ContratStageDTO contractDTO) throws Exception {
        Optional<ContratStage> optionalContract = contratStageRepository.findById(contractDTO.getId());
        if(optionalContract.isEmpty()) throw new Exception("Contract not found");
        ContratStage contract = optionalContract.get();
        contract.setStatutGestionnaire(ContratStage.Statut.Signer);
        return ContratStageDTO.fromContratStage(contratStageRepository.save(contract));
    }

    @Transactional
    public GenerateContratPdfDTO saveContratGenere(GenerateContratPdfDTO contratPdfDTO, Long contractId) throws Exception {
        GenerateContratPDF contratPDF = GenerateContratPdfDTO.toContratPdf(contratPdfDTO);

        GenerateContratPDF savedContratPDF = generateContratPDFRepository.save(contratPDF);

        Optional<ContratStage> optionalContract = contratStageRepository.findById(contractId);
        if (optionalContract.isEmpty()) {
            throw new Exception("ContratStage not found with id: " + contractId);
        }
        ContratStage contract = optionalContract.get();
        contract.setContratPDF(savedContratPDF);
        contratStageRepository.save(contract);

        return GenerateContratPdfDTO.fromContratPdf(savedContratPDF);
    }

    @Transactional
    public EvaluationMilieuStageDTO saveEvaluationMilieuStage(EvaluationMilieuStageDTO dto, Long contractId) throws Exception {
        EvaluationMilieuStagePDF evaluationMilieuStagePDF = EvaluationMilieuStageDTO.toEvaluationMilieuStagePDF(dto);

        EvaluationMilieuStagePDF savedMilieuStagePDF = evaluationMilieuStageRepository.save(evaluationMilieuStagePDF);

        Optional<ContratStage> optionalContract = contratStageRepository.findById(contractId);
        if (optionalContract.isEmpty()) {
            throw new Exception("Contract not found with id: " + contractId);
        }
        ContratStage contract = optionalContract.get();
        contract.setEvaluationMilieuStagePDF(savedMilieuStagePDF);
        contratStageRepository.save(contract);

        return EvaluationMilieuStageDTO.fromEvaluationMilieuStage(savedMilieuStagePDF);
    }
}
