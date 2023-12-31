package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTO;
import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTODetails;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.EvaluationPdfDto;
import com.example.tpbackend.DTO.GenerateContratPdfDTO;
import com.example.tpbackend.DTO.candidature.CandidatureDTODetailed;
import com.example.tpbackend.DTO.entrevue.EntrevueDTODetailed;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;

import com.example.tpbackend.models.*;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;

import com.example.tpbackend.repository.*;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;

import com.example.tpbackend.utils.ByteArrayMultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ContextConfiguration(classes = {GestionnaireService.class})
@ExtendWith(MockitoExtension.class)
public class GestionnaireServiceTest {

    @Mock
    private CvRepository cvRepository;

    @Mock
    private EntrevueRepository entrevueRepository;

    @Mock
    private GestionnaireRepository gestionnaireRepository;

    @InjectMocks
    private GestionnaireService gestionnaireService;

    @Mock
    private OffreStageRepository offreStageRepository;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private EmployerRepository employerRepository;

    @Mock
    private GenerateContratPDFRepository generateContratPDFRepository;

    @Mock
    private ContratStageRepository contratStageRepository;

    @Mock
    private CandidatureRepository candidatureRepository;


    /**
     * Method under test: {@link GestionnaireService#saveGestionnaire(GestionnairePostDTO)}
     */
    @Test
    void testSaveGestionnaire() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Gestionnaire);
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setFirstName("Jane");
        utilisateur.setLastName("Doe");
        utilisateur.setPhoneNumber("6625550144");
        utilisateur.setPhoneNumber("6625550144");


        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setMatricule("Matricule");
        gestionnaire.setUtilisateur(utilisateur);
        when(gestionnaireRepository.save(Mockito.<Gestionnaire>any())).thenReturn(gestionnaire);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);
        when(utilisateurRepository.save(Mockito.<Utilisateur>any())).thenReturn(utilisateur2);
        GestionnairePostDTO gestionnaireDTO = new GestionnairePostDTO("Matricule");

        assertSame(gestionnaireDTO, gestionnaireService.saveGestionnaire(gestionnaireDTO));
        verify(gestionnaireRepository).save(Mockito.<Gestionnaire>any());
        verify(utilisateurRepository).save(Mockito.<Utilisateur>any());
    }


    /**
     * Method under test: {@link GestionnaireService#existsByMatricule(String)}
     */
    @Test
    void testExistsByMatricule() {
        when(gestionnaireRepository.existsByMatricule(Mockito.<String>any())).thenReturn(true);
        assertTrue(gestionnaireService.existsByMatricule("Matricule"));
        verify(gestionnaireRepository).existsByMatricule(Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByMatricule(String)}
     */
    @Test
    void testExistsByMatricule2() {
        when(gestionnaireRepository.existsByMatricule(Mockito.<String>any())).thenReturn(false);
        assertFalse(gestionnaireService.existsByMatricule("Matricule"));
        verify(gestionnaireRepository).existsByMatricule(Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByEmail(String)}
     */
    @Test
    void testExistsByEmail() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(true);
        assertTrue(gestionnaireService.existsByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByEmail(String)}
     */
    @Test
    void testExistsByEmail2() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(false);
        assertFalse(gestionnaireService.existsByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByMatriculeOrEmail(String, String)}
     */
    @Test
    void testExistsByMatriculeOrEmail() {
        when(gestionnaireRepository.existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any()))
                .thenReturn(true);
        assertTrue(gestionnaireService.existsByMatriculeOrEmail("Matricule", "jane.doe@example.org"));
        verify(gestionnaireRepository).existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByMatriculeOrEmail(String, String)}
     */
    @Test
    void testExistsByMatriculeOrEmail2() {
        when(gestionnaireRepository.existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any()))
                .thenReturn(false);
        assertFalse(gestionnaireService.existsByMatriculeOrEmail("Matricule", "jane.doe@example.org"));
        verify(gestionnaireRepository).existsByMatriculeOrEmail(Mockito.<String>any(), Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#getToutesLesOffres()}
     */
    @Test
    void testGetToutesLesOffres() {
        ArrayList<OffreStageDTO> offreStageDTOList = new ArrayList<>();
        ArrayList<OffreStage> offreStageArrayList = new ArrayList<>();
        when(offreStageRepository.findAll()).thenReturn(offreStageArrayList);
        for(OffreStage offreStage: offreStageArrayList){
            offreStageDTOList.add(offreStage.toOffreStageDTO());
        }

        ArrayList<OffreStageDTO> actualToutesLesOffres = gestionnaireService.getToutesLesOffres();
        assertSame(offreStageDTOList.size(), actualToutesLesOffres.size());
        assertTrue(actualToutesLesOffres.isEmpty());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvs()}
     */
    @Test
    void testGetAllCvs() {
        when(cvRepository.findAll()).thenReturn(new ArrayList<>());
        assertTrue(gestionnaireService.getAllCvs().isEmpty());
        verify(cvRepository).findAll();
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvs()}
     */
    @Test
    void testGetAllCvs2() throws IOException {
        Cv cv = new Cv();
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.Status.Accepted);
        cv.setStatusVuPasVuG(Cv.StatusVuPasVu.pasVu);
        cv.setStatusVuPasVuS(Cv.StatusVuPasVu.pasVu);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.findAll()).thenReturn(cvList);
        List<CvDTO> actualAllCvs = gestionnaireService.getAllCvs();
        System.out.println(actualAllCvs);
        assertEquals(1, actualAllCvs.size());
        CvDTO getResult = actualAllCvs.get(0);
        assertEquals("foo.txt", getResult.getFileName());
        assertEquals("Accepted", getResult.getStatus());
        assertEquals("pasVu", getResult.getStatusVuPasVuG());
        assertEquals("pasVu", getResult.getStatusVuPasVuS());
        assertEquals("Matricule", getResult.getMatricule());
        MultipartFile file_cv = getResult.getFile_cv();
        assertTrue(file_cv instanceof ByteArrayMultipartFile);
        assertEquals(8, file_cv.getBytes().length);
        assertEquals("application/pdf", file_cv.getContentType());
        assertEquals("foo.txt", file_cv.getName());
        assertEquals("foo.txt", file_cv.getOriginalFilename());
        verify(cvRepository).findAll();
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvs()}
     */
    @Test
    void testGetAllCvs3() throws UnsupportedEncodingException {
        Cv cv = mock(Cv.class);
        when(cv.toCvDTO()).thenReturn(new CvDTO());
        doNothing().when(cv).setFileName(Mockito.<String>any());
        doNothing().when(cv).setFile_cv(Mockito.<byte[]>any());
        doNothing().when(cv).setId(anyLong());
        doNothing().when(cv).setMatricule(Mockito.<String>any());
        doNothing().when(cv).setStatus(Mockito.<Cv.Status>any());
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.Status.Accepted);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.findAll()).thenReturn(cvList);
        assertEquals(1, gestionnaireService.getAllCvs().size());
        verify(cvRepository).findAll();
        verify(cv).toCvDTO();
        verify(cv).setFileName(Mockito.<String>any());
        verify(cv).setFile_cv(Mockito.<byte[]>any());
        verify(cv).setId(anyLong());
        verify(cv).setMatricule(Mockito.<String>any());
        verify(cv).setStatus(Mockito.<Cv.Status>any());
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvsByFileName(String)}
     */
    @Test
    void testGetAllCvsByFileName() {
        when(cvRepository.getAllByFileName(Mockito.<String>any())).thenReturn(new ArrayList<>());
        assertTrue(gestionnaireService.getAllCvsByFileName("foo.txt").isEmpty());
        verify(cvRepository).getAllByFileName(Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvsByFileName(String)}
     */
    @Test
    void testGetAllCvsByFileName2() throws IOException {
        Cv cv = new Cv();
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.Status.Accepted);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.getAllByFileName(Mockito.<String>any())).thenReturn(cvList);
        List<CvDTO> actualAllCvsByFileName = gestionnaireService.getAllCvsByFileName("foo.txt");
        assertEquals(1, actualAllCvsByFileName.size());
        CvDTO getResult = actualAllCvsByFileName.get(0);
        assertEquals("foo.txt", getResult.getFileName());
        assertEquals("Accepted", getResult.getStatus());
        assertEquals("Matricule", getResult.getMatricule());
        MultipartFile file_cv = getResult.getFile_cv();
        assertTrue(file_cv instanceof ByteArrayMultipartFile);
        assertEquals(8, file_cv.getBytes().length);
        assertEquals("application/pdf", file_cv.getContentType());
        assertEquals("foo.txt", file_cv.getName());
        assertEquals("foo.txt", file_cv.getOriginalFilename());
        verify(cvRepository).getAllByFileName(Mockito.<String>any());
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvsByFileName(String)}
     */
    @Test
    void testGetAllCvsByFileName3() throws UnsupportedEncodingException {
        Cv cv = mock(Cv.class);
        when(cv.toCvDTO()).thenReturn(new CvDTO());
        doNothing().when(cv).setFileName(Mockito.<String>any());
        doNothing().when(cv).setFile_cv(Mockito.<byte[]>any());
        doNothing().when(cv).setId(anyLong());
        doNothing().when(cv).setMatricule(Mockito.<String>any());
        doNothing().when(cv).setStatus(Mockito.<Cv.Status>any());
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.Status.Accepted);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.getAllByFileName(Mockito.<String>any())).thenReturn(cvList);
        assertEquals(1, gestionnaireService.getAllCvsByFileName("foo.txt").size());
        verify(cvRepository).getAllByFileName(Mockito.<String>any());
        verify(cv).toCvDTO();
        verify(cv).setFileName(Mockito.<String>any());
        verify(cv).setFile_cv(Mockito.<byte[]>any());
        verify(cv).setId(anyLong());
        verify(cv).setMatricule(Mockito.<String>any());
        verify(cv).setStatus(Mockito.<Cv.Status>any());
    }


    @Test
    public void testGetStudentsWithEntrevue() {

        Utilisateur user1 = new Utilisateur(
                "Jean",
                "Dupont",
                "stu1@gmail.com",
                "514-123-4567",
                "123456789",
                "Student"
        );
        user1.setId(1L);

        Student student1 = new Student( "MAT123", "Programme1", user1);
        Employer employer1 = new Employer(1L, "ABC", user1);

        Utilisateur user2 = new Utilisateur(
                "Marie",
                "Doe",
                "stu2@gmail.com",
                "514-123-4567",
                "123456789",
                "Student"
        );
        user2.setId(2L);

        Student student2 = new Student("MAT456", "Programme2", user2);
        Employer employer2 = new Employer(2L, "ABCDC", user2);

        // Créer des entrevues pour ces étudiants
        Entrevue entrevue1 = new Entrevue();
        entrevue1.setEmployer(employer1);
        entrevue1.setStudent(student1);
        entrevue1.setStatus(Entrevue.Status.Acceptee);
        entrevue1.setId(1L);

        Entrevue entrevue2 = new Entrevue();
        entrevue2.setStudent(student2);
        entrevue2.setEmployer(employer2);
        entrevue2.setStatus(Entrevue.Status.Acceptee);
        entrevue2.setId(2L);

        // Mock le comportement du repository pour renvoyer les entrevues avec étudiants non nuls
        when(entrevueRepository.findAll()).thenReturn(Arrays.asList(entrevue1, entrevue2));

        // Appeler le service
        List<EntrevueDTODetailed> result = gestionnaireService.getStudentsWithEntrevue();

        // Vérifications
        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(dto -> dto.getStudent().getMatricule().equals("MAT123")));
        assertTrue(result.stream().anyMatch(dto -> dto.getStudent().getMatricule().equals("MAT456")));
    }

    @Test
    public void testCreateContrat_Success() {
        // Arrange
        Utilisateur mockUtilisateur = new Utilisateur();
        mockUtilisateur.setId(6);
        mockUtilisateur.setFirstName("abcd");
        mockUtilisateur.setLastName("ok");

        Student mockStudent = new Student();
        mockStudent.setMatricule("9");
        mockStudent.setUtilisateur(mockUtilisateur);

        Employer mockEmployer = new Employer();
        mockEmployer.setId(1L);
        mockEmployer.setUtilisateur(mockUtilisateur);

        OffreStage mockOffreStage = new OffreStage();
        mockOffreStage.setId(3L);
        mockOffreStage.setTitre("abc");
        mockOffreStage.setEmployer(mockEmployer);
        mockOffreStage.setSalaire(20.0);

        Cv cv = mock(Cv.class);

        Candidature mockCandidature = mock(Candidature.class);
        when(mockCandidature.getId()).thenReturn(5L);
        when(mockCandidature.getCvStudent()).thenReturn(cv);
        when(mockCandidature.getOffreStage()).thenReturn(mockOffreStage);
        when(mockCandidature.getStudent()).thenReturn(mockStudent);

        List<OffreStage> mockOffreStages = new ArrayList<>();
        mockOffreStages.add(mockOffreStage);

        List<Candidature> mockCandidatures = new ArrayList<>();
        mockCandidatures.add(mockCandidature);

        mockEmployer.setOffresStages(mockOffreStages);

        mockStudent.setOffresStages(mockOffreStages);
        mockStudent.setCandidatures(mockCandidatures);

        ContratStage mockContrat = new ContratStage();
        mockContrat.setCandidature(mockCandidature);
        mockContrat.setId(3L);
        mockContrat.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        mockContrat.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);
        mockContrat.setStatutEmployeur(ContratStage.Statut.Pas_Signer);

        ContratStageDTO contratDTO = ContratStageDTO.fromContratStage(mockContrat);
        contratDTO.setCandidatureId(mockCandidature.getId());
        contratDTO.setStatutGestionnaire("Pas_Signer");
        contratDTO.setStatutEtudiant("Pas_Signer");
        contratDTO.setStatutEmployeur("Pas_Signer");
        contratDTO.setStatusVuPasVuG("pasVu");
        contratDTO.setStatusVuPasVuS("pasVu");

        Mockito.when(contratStageRepository.save(any(ContratStage.class))).thenReturn(mockContrat);
        Mockito.when(candidatureRepository.getReferenceById(anyLong())).thenReturn(mockCandidature);

        ContratStageDTODetails result = gestionnaireService.createContrat(contratDTO);
        assertNotNull(result);
    }

    @Test
    void testGetAllContrats() {
        Long employeurId = 1L;
        ContratStage contrat1 = new ContratStage();
        ContratStage contrat2 = new ContratStage();

        Student studentMock = mock(Student.class);
        Employer employeurMock = mock(Employer.class);
        OffreStage offreStageMock = mock(OffreStage.class);
        Candidature candidature1 = mock(Candidature.class);
        Candidature candidature2 = mock(Candidature.class);

        when(offreStageMock.getEmployer()).thenReturn(employeurMock);
        when(candidature1.getId()).thenReturn(1L);
        when(candidature2.getId()).thenReturn(2L);

        when(studentMock.getUtilisateur()).thenReturn(new Utilisateur());
        when(candidature1.getStudent()).thenReturn(studentMock);
        when(candidature1.getOffreStage()).thenReturn(offreStageMock);
        when(candidature2.getStudent()).thenReturn(studentMock);
        when(candidature2.getOffreStage()).thenReturn(offreStageMock);

        contrat1.setCandidature(candidature1);
        contrat1.setNomDePoste("poste Name 1");
        contrat1.setStatutEmployeur(ContratStage.Statut.Pas_Signer);
        contrat1.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        contrat1.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);

        contrat2.setCandidature(candidature2);
        contrat2.setNomDePoste("poste Name 2");
        contrat2.setStatutEmployeur(ContratStage.Statut.Pas_Signer);
        contrat2.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        contrat2.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);

        List<ContratStage> contrats = Arrays.asList(contrat1, contrat2);
        when(contratStageRepository.findAll()).thenReturn(contrats);

        List<ContratStageDTO> result = gestionnaireService.getAllContrats();

        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getCandidatureId());
        assertEquals("poste Name 1", result.get(0).getNomDePoste());
        assertEquals(2L, result.get(1).getCandidatureId());
        assertEquals("poste Name 2", result.get(1).getNomDePoste());
    }



    @Test
    void getCandidaturesAcceptees() {
        byte[] mockLetter = new byte[] {1, 2, 3};
        Utilisateur mockUtilisateur = new Utilisateur();
        mockUtilisateur.setFirstName("abcd");
        mockUtilisateur.setLastName("ok");
        Student mockStudent = new Student();
        mockStudent.setUtilisateur(mockUtilisateur);
        OffreStage mockOffreStage = new OffreStage();
        mockOffreStage.setSalaire(15.0);
        mockOffreStage.setId(7L);
        mockOffreStage.setEmployer(new Employer("abc", mockUtilisateur));
        Cv mockCv = mock(Cv.class);

        Candidature candidature1 = new Candidature(mockLetter, mockStudent, mockOffreStage, mockCv, "fichier1.pdf",
                Candidature.Status.Accepted, Candidature.StatusVuPasVu.pasVu, Candidature.StatusVuPasVu.pasVu);
        Candidature candidature2 = new Candidature(mockLetter, mockStudent, mockOffreStage, mockCv, "fichier2.pdf",
                Candidature.Status.Accepted, Candidature.StatusVuPasVu.pasVu, Candidature.StatusVuPasVu.pasVu);

        List<Candidature> mockedList = Arrays.asList(candidature1, candidature2);

        when(candidatureRepository.findByStatus(Candidature.Status.Accepted)).thenReturn(mockedList);

        List<CandidatureDTODetailed> result = gestionnaireService.getCandidaturesAcceptees();

        assertEquals(2, result.size());

        assertEquals(CandidatureDTODetailed.fromCandidature(candidature1), result.get(0));
        assertEquals(CandidatureDTODetailed.fromCandidature(candidature2), result.get(1));

        verify(candidatureRepository, times(1)).findByStatus(Candidature.Status.Accepted);
    }

    @Test
    void getCandidaturesAccepteesReturnsEmptyListWhenNoAcceptedApplications() {
        when(candidatureRepository.findByStatus(Candidature.Status.Accepted)).thenReturn(Collections.emptyList());

        List<CandidatureDTODetailed> result = gestionnaireService.getCandidaturesAcceptees();
        System.out.println(result);

        assertTrue(result.isEmpty());
    }

    @Test
    void generateContractPdf() throws Exception {
        byte[] fakePdfContent = "pdf content".getBytes();
        MultipartFile mockFile = mock(MultipartFile.class);

        when(mockFile.getOriginalFilename()).thenReturn("evaluation.pdf");
        when(mockFile.getBytes()).thenReturn(fakePdfContent);

        Candidature mockCandidature = mock(Candidature.class);

        ContratStage mockContrat = new ContratStage();
        mockContrat.setCandidature(mockCandidature);
        mockContrat.setId(3L);
        mockContrat.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        mockContrat.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);
        mockContrat.setStatutEmployeur(ContratStage.Statut.Pas_Signer);

        GenerateContratPdfDTO contractDto = new GenerateContratPdfDTO(mockFile);

        GenerateContratPDF contract = new GenerateContratPDF();
        contract.setName(contractDto.getName());
        contract.setContent(contractDto.getContent());
        contract.setId(1L);

        when(generateContratPDFRepository.save(any(GenerateContratPDF.class))).thenReturn(contract);
        when(contratStageRepository.findById(anyLong())).thenReturn(Optional.of(mockContrat));

        GenerateContratPdfDTO result = gestionnaireService.saveContratGenere(contractDto, 1L);


        verify(generateContratPDFRepository).save(argThat(savedContrat ->
                Arrays.equals(fakePdfContent, savedContrat.getContent()) &&
                        "evaluation.pdf".equals(savedContrat.getName())
        ));

    }
}
