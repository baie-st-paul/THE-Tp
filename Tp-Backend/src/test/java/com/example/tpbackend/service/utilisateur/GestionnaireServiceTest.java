package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.EntrevueDTODetailed;
import com.example.tpbackend.DTO.candidature.CandidatureDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;

import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;

import com.example.tpbackend.repository.ContratStageRepository;
import com.example.tpbackend.repository.CandidatureRepository;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.StudentRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.service.EntrevueService;
import com.example.tpbackend.service.security.AuthenticationService;
import com.example.tpbackend.utils.ByteArrayMultipartFile;
import org.junit.jupiter.api.Disabled;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

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

import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import java.util.Arrays;
import java.util.List;
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
        cv.setStatus(Cv.StatusCV.Accepted);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.findAll()).thenReturn(cvList);
        List<CvDTO> actualAllCvs = gestionnaireService.getAllCvs();
        assertEquals(1, actualAllCvs.size());
        CvDTO getResult = actualAllCvs.get(0);
        assertEquals("foo.txt", getResult.getFileName());
        assertEquals("Accepted", getResult.getStatus());
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
        doNothing().when(cv).setStatus(Mockito.<Cv.StatusCV>any());
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);

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
        verify(cv).setStatus(Mockito.<Cv.StatusCV>any());
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
        cv.setStatus(Cv.StatusCV.Accepted);

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
        doNothing().when(cv).setStatus(Mockito.<Cv.StatusCV>any());
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes("UTF-8"));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);

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
        verify(cv).setStatus(Mockito.<Cv.StatusCV>any());
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
        // Créer des étudiants
        Student student1 = new Student( "MAT123", "Programme1", user1);
        student1.getUtilisateur().setId(1L);

        Utilisateur user2 = new Utilisateur(
                "Marie",
                "Doe",
                "stu2@gmail.com",
                "514-123-4567",
                "123456789",
                "Student"
        );
        Student student2 = new Student("MAT456", "Programme2", user2);
        student2.getUtilisateur().setId(2L);

        // Créer des entrevues pour ces étudiants
        Entrevue entrevue1 = new Entrevue();
        entrevue1.setEmployer(new Employer());
        entrevue1.getEmployer().setId(1L);
        entrevue1.getEmployer().setCompanyName("ABC");
        entrevue1.setStudent(student1);
        entrevue1.setStatus(Entrevue.Status.Acceptee);
        entrevue1.setId(1L);

        Entrevue entrevue2 = new Entrevue();
        entrevue2.setStudent(student2);
        entrevue2.setEmployer(new Employer());
        entrevue2.getEmployer().setId(2L);
        entrevue2.getEmployer().setCompanyName("ABCDC");
        entrevue2.setStatus(Entrevue.Status.Acceptee);
        entrevue2.setId(2L);

        // Mock le comportement du repository pour renvoyer les entrevues avec étudiants non nuls
        when(entrevueRepository.findAll()).thenReturn(Arrays.asList(entrevue1, entrevue2));

        // Appeler le service
        List<EntrevueDTODetailed> result = gestionnaireService.getStudentsWithEntrevue();

        // Vérifications
        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(dto -> dto.getEtudiant().getMatricule().equals("MAT123")));
        assertTrue(result.stream().anyMatch(dto -> dto.getEtudiant().getMatricule().equals("MAT456")));
    }

    @Test
    public void testCreateContrat_Success() {
        // Arrange
        ContratStageDTO inputDto = new ContratStageDTO();
        inputDto.setStudentId("9");
        inputDto.setEmployerId(1L);
        Student mockStudent = new Student();
        Employer mockEmployer = new Employer();
        ContratStage mockContrat = new ContratStage();

        Mockito.when(studentRepository.findById(9L)).thenReturn(Optional.of(mockStudent));
        Mockito.when(employerRepository.findById(1L)).thenReturn(Optional.of(mockEmployer));
        Mockito.when(contratStageRepository.save(any(ContratStage.class))).thenReturn(mockContrat);

        // Act
        ContratStageDTO result = gestionnaireService.createContrat(inputDto);

        // Assert
        assertNotNull(result);
    }


    @Test
    public void testCreateContrat_StudentNotFound() {
        // Arrange
        ContratStageDTO inputDto = new ContratStageDTO();
        inputDto.setStudentId("nonExistentStudentId");

        Mockito.when(studentRepository.findById(3432L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            gestionnaireService.createContrat(inputDto);
        });
    }

    @Test
    public void testCreateContrat_EmployerNotFound() {
        // Arrange
        ContratStageDTO inputDto = new ContratStageDTO();
        inputDto.setStudentId("someStudentId");

        Student mockStudent = new Student();

        Mockito.when(studentRepository.findById(1L)).thenReturn(Optional.of(mockStudent));
        Mockito.when(employerRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            gestionnaireService.createContrat(inputDto);
        });
    }


    @Test
    void getCandidaturesAcceptees() {
        byte[] mockLetter = new byte[] {1, 2, 3};
        Student mockStudent = mock(Student.class);
        OffreStage mockOffreStage = mock(OffreStage.class);
        Cv mockCv = mock(Cv.class);

        Candidature candidature1 = new Candidature(mockLetter, mockStudent, mockOffreStage, mockCv, "fichier1.pdf", Candidature.Status.Accepted);
        Candidature candidature2 = new Candidature(mockLetter, mockStudent, mockOffreStage, mockCv, "fichier2.pdf", Candidature.Status.Accepted);

        List<Candidature> mockedList = Arrays.asList(candidature1, candidature2);

        when(candidatureRepository.findByStatus(Candidature.Status.Accepted)).thenReturn(mockedList);

        List<CandidatureDTO> result = gestionnaireService.getCandidaturesAcceptees();

        assertEquals(2, result.size());

        assertEquals(CandidatureDTO.fromCandidature(candidature1), result.get(0));
        assertEquals(CandidatureDTO.fromCandidature(candidature2), result.get(1));

        verify(candidatureRepository, times(1)).findByStatus(Candidature.Status.Accepted);
    }

    @Test
    void getCandidaturesAccepteesReturnsEmptyListWhenNoAcceptedApplications() {
        when(candidatureRepository.findByStatus(Candidature.Status.Accepted)).thenReturn(Collections.emptyList());

        List<CandidatureDTO> result = gestionnaireService.getCandidaturesAcceptees();

        assertTrue(result.isEmpty());

        verify(candidatureRepository, times(1)).findByStatus(Candidature.Status.Accepted);
        assertTrue(result.stream().anyMatch(dto -> dto.getStudent().getMatricule().equals("0101010101")));
        assertTrue(result.stream().anyMatch(dto -> dto.getStudent().getMatricule().equals("0202020202")));
    }


}

