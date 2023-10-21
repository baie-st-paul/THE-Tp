package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.utilisateur.UtilisateurDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnaireGetDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.DTO.utilisateur.student.StudentGetDTO;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.Entrevue;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.EntrevueRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.utils.ByteArrayMultipartFile;

import java.io.IOException;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.atLeast;
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

    /**
     * Method under test: {@link GestionnaireService#saveGestionnaire(GestionnairePostDTO)}
     */
    @Test
    void testSaveGestionnaire() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setFirstName("Jane");
        gestionnaire.setLastName("Doe");
        gestionnaire.setMatricule("Matricule");
        gestionnaire.setPhoneNumber("6625550144");
        gestionnaire.setUtilisateur(utilisateur);
        when(gestionnaireRepository.save(Mockito.any())).thenReturn(gestionnaire);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);
        when(utilisateurRepository.save(Mockito.any())).thenReturn(utilisateur2);
        GestionnairePostDTO gestionnaireDTO = new GestionnairePostDTO("Jane", "Doe", "Matricule", "6625550144",
                "jane.doe@example.org", "iloveyou");

        assertSame(gestionnaireDTO, gestionnaireService.saveGestionnaire(gestionnaireDTO));
        verify(gestionnaireRepository).save(Mockito.any());
        verify(utilisateurRepository).save(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#saveGestionnaire(GestionnairePostDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testSaveGestionnaire2() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Cannot invoke "com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO.toGestionnaire(com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO)" because "gestionnaireDTO" is null
        //       at com.example.tpbackend.service.utilisateur.GestionnaireService.saveGestionnaire(GestionnaireService.java:58)
        //   See https://diff.blue/R013 to resolve this issue.

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setFirstName("Jane");
        gestionnaire.setLastName("Doe");
        gestionnaire.setMatricule("Matricule");
        gestionnaire.setPhoneNumber("6625550144");
        gestionnaire.setUtilisateur(utilisateur);
        when(gestionnaireRepository.save(Mockito.any())).thenReturn(gestionnaire);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);
        when(utilisateurRepository.save(Mockito.any())).thenReturn(utilisateur2);
        gestionnaireService.saveGestionnaire(null);
    }

    /**
     * Method under test: {@link GestionnaireService#saveGestionnaire(GestionnairePostDTO)}
     */
    @Test
    void testSaveGestionnaire3() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setFirstName("Jane");
        gestionnaire.setLastName("Doe");
        gestionnaire.setMatricule("Matricule");
        gestionnaire.setPhoneNumber("6625550144");
        gestionnaire.setUtilisateur(utilisateur);
        when(gestionnaireRepository.save(Mockito.any())).thenReturn(gestionnaire);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);
        when(utilisateurRepository.save(Mockito.any())).thenReturn(utilisateur2);

        Utilisateur utilisateur3 = new Utilisateur();
        utilisateur3.setEmail("jane.doe@example.org");
        utilisateur3.setId(1L);
        utilisateur3.setPassword("iloveyou");
        utilisateur3.setRole(Utilisateur.Role.Student);

        Gestionnaire gestionnaire2 = new Gestionnaire();
        gestionnaire2.setFirstName("Jane");
        gestionnaire2.setLastName("Doe");
        gestionnaire2.setMatricule("Matricule");
        gestionnaire2.setPhoneNumber("6625550144");
        gestionnaire2.setUtilisateur(utilisateur3);
        GestionnairePostDTO gestionnaireDTO = mock(GestionnairePostDTO.class);
        when(gestionnaireDTO.toGestionnaire(Mockito.any())).thenReturn(gestionnaire2);
        assertSame(gestionnaireDTO, gestionnaireService.saveGestionnaire(gestionnaireDTO));
        verify(gestionnaireRepository).save(Mockito.any());
        verify(utilisateurRepository).save(Mockito.any());
        verify(gestionnaireDTO, atLeast(1)).toGestionnaire(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#saveGestionnaire(String, String, String, String, String, String, String)}
     */
    @Test
    void testSaveGestionnaire4() {
        when(utilisateurRepository.existsByEmail(Mockito.any())).thenReturn(true);
        assertNull(gestionnaireService.saveGestionnaire("Jane", "Doe", "6625550144", "Matricule", "jane.doe@example.org",
                "iloveyou", "Role"));
        verify(utilisateurRepository).existsByEmail(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#saveGestionnaire(String, String, String, String, String, String, String)}
     */
    @Test
    void testSaveGestionnaire5() {
        when(gestionnaireRepository.existsByMatricule(Mockito.any())).thenReturn(true);
        when(utilisateurRepository.existsByEmail(Mockito.any())).thenReturn(false);
        assertNull(gestionnaireService.saveGestionnaire("Jane", "Doe", "6625550144", "Matricule", "jane.doe@example.org",
                "iloveyou", "Role"));
        verify(gestionnaireRepository).existsByMatricule(Mockito.any());
        verify(utilisateurRepository).existsByEmail(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#saveGestionnaire(String, String, String, String, String, String, String)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testSaveGestionnaire6() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.IllegalArgumentException: No enum constant com.example.tpbackend.models.utilisateur.Utilisateur.Role.Role
        //       at java.lang.Enum.valueOf(Enum.java:273)
        //       at com.example.tpbackend.models.utilisateur.Utilisateur$Role.valueOf(Utilisateur.java:44)
        //       at com.example.tpbackend.models.utilisateur.Utilisateur.<init>(Utilisateur.java:33)
        //       at com.example.tpbackend.service.utilisateur.GestionnaireService.saveGestionnaire(GestionnaireService.java:43)
        //   See https://diff.blue/R013 to resolve this issue.

        when(gestionnaireRepository.existsByMatricule(Mockito.any())).thenReturn(false);
        when(utilisateurRepository.existsByEmail(Mockito.any())).thenReturn(false);
        gestionnaireService.saveGestionnaire("Jane", "Doe", "6625550144", "Matricule", "jane.doe@example.org", "iloveyou",
                "Role");
    }

    /**
     * Method under test: {@link GestionnaireService#existsByMatricule(String)}
     */
    @Test
    void testExistsByMatricule() {
        when(gestionnaireRepository.existsByMatricule(Mockito.any())).thenReturn(true);
        assertTrue(gestionnaireService.existsByMatricule("Matricule"));
        verify(gestionnaireRepository).existsByMatricule(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByMatricule(String)}
     */
    @Test
    void testExistsByMatricule2() {
        when(gestionnaireRepository.existsByMatricule(Mockito.any())).thenReturn(false);
        assertFalse(gestionnaireService.existsByMatricule("Matricule"));
        verify(gestionnaireRepository).existsByMatricule(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByEmail(String)}
     */
    @Test
    void testExistsByEmail() {
        when(utilisateurRepository.existsByEmail(Mockito.any())).thenReturn(true);
        assertTrue(gestionnaireService.existsByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByEmail(String)}
     */
    @Test
    void testExistsByEmail2() {
        when(utilisateurRepository.existsByEmail(Mockito.any())).thenReturn(false);
        assertFalse(gestionnaireService.existsByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByMatriculeOrEmail(String, String)}
     */
    @Test
    void testExistsByMatriculeOrEmail() {
        when(gestionnaireRepository.existsByMatriculeOrEmail(Mockito.any(), Mockito.any()))
                .thenReturn(true);
        assertTrue(gestionnaireService.existsByMatriculeOrEmail("Matricule", "jane.doe@example.org"));
        verify(gestionnaireRepository).existsByMatriculeOrEmail(Mockito.any(), Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#existsByMatriculeOrEmail(String, String)}
     */
    @Test
    void testExistsByMatriculeOrEmail2() {
        when(gestionnaireRepository.existsByMatriculeOrEmail(Mockito.any(), Mockito.any()))
                .thenReturn(false);
        assertFalse(gestionnaireService.existsByMatriculeOrEmail("Matricule", "jane.doe@example.org"));
        verify(gestionnaireRepository).existsByMatriculeOrEmail(Mockito.any(), Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#getGestionnaireByUser(UtilisateurDTO)}
     */
    @Test
    void testGetGestionnaireByUser() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setFirstName("Jane");
        gestionnaire.setLastName("Doe");
        gestionnaire.setMatricule("Matricule");
        gestionnaire.setPhoneNumber("6625550144");
        gestionnaire.setUtilisateur(utilisateur);
        when(gestionnaireRepository.findGestionnaireByUser()).thenReturn(gestionnaire);
        GestionnaireGetDTO actualGestionnaireByUser = gestionnaireService
                .getGestionnaireByUser(new UtilisateurDTO("jane.doe@example.org", "iloveyou", "Role"));
        assertEquals("jane.doe@example.org", actualGestionnaireByUser.getEmail());
        assertEquals("6625550144", actualGestionnaireByUser.getPhoneNumber());
        assertEquals("Matricule", actualGestionnaireByUser.getMatricule());
        assertEquals("Doe", actualGestionnaireByUser.getLastName());
        assertEquals("Jane", actualGestionnaireByUser.getFirstName());
        verify(gestionnaireRepository).findGestionnaireByUser();
    }

    /**
     * Method under test: {@link GestionnaireService#getGestionnaireByUser(UtilisateurDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testGetGestionnaireByUser2() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Cannot invoke "com.example.tpbackend.DTO.utilisateur.UtilisateurDTO.getEmail()" because "user" is null
        //       at com.example.tpbackend.service.utilisateur.GestionnaireService.getGestionnaireByUser(GestionnaireService.java:79)
        //   See https://diff.blue/R013 to resolve this issue.

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setFirstName("Jane");
        gestionnaire.setLastName("Doe");
        gestionnaire.setMatricule("Matricule");
        gestionnaire.setPhoneNumber("6625550144");
        gestionnaire.setUtilisateur(utilisateur);
        when(gestionnaireRepository.findGestionnaireByUser()).thenReturn(gestionnaire);
        gestionnaireService.getGestionnaireByUser(null);
    }

    /**
     * Method under test: {@link GestionnaireService#getToutesLesOffres()}
     */
    @Test
    void testGetToutesLesOffres() {
        ArrayList<OffreStage> offreStageList = new ArrayList<>();
        when(offreStageRepository.findAll()).thenReturn(offreStageList);
        List<OffreStage> actualToutesLesOffres = gestionnaireService.getOffres();
        assertSame(offreStageList, actualToutesLesOffres);
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
        cv.setFile_cv("AXAXAXAX".getBytes(StandardCharsets.UTF_8));
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
    void testGetAllCvs3() {
        Cv cv = mock(Cv.class);
        when(cv.toCvDTO()).thenReturn(new CvDTO());
        doNothing().when(cv).setFileName(Mockito.any());
        doNothing().when(cv).setFile_cv(Mockito.any());
        doNothing().when(cv).setId(anyLong());
        doNothing().when(cv).setMatricule(Mockito.any());
        doNothing().when(cv).setStatus(Mockito.any());
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes(StandardCharsets.UTF_8));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.findAll()).thenReturn(cvList);
        assertEquals(1, gestionnaireService.getAllCvs().size());
        verify(cvRepository).findAll();
        verify(cv).toCvDTO();
        verify(cv).setFileName(Mockito.any());
        verify(cv).setFile_cv(Mockito.any());
        verify(cv).setId(anyLong());
        verify(cv).setMatricule(Mockito.any());
        verify(cv).setStatus(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvsByFileName(String)}
     */
    @Test
    void testGetAllCvsByFileName() {
        when(cvRepository.getAllByFileName(Mockito.any())).thenReturn(new ArrayList<>());
        assertTrue(gestionnaireService.getAllCvsByFileName("foo.txt").isEmpty());
        verify(cvRepository).getAllByFileName(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvsByFileName(String)}
     */
    @Test
    void testGetAllCvsByFileName2() throws IOException {
        Cv cv = new Cv();
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes(StandardCharsets.UTF_8));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.getAllByFileName(Mockito.any())).thenReturn(cvList);
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
        verify(cvRepository).getAllByFileName(Mockito.any());
    }

    /**
     * Method under test: {@link GestionnaireService#getAllCvsByFileName(String)}
     */
    @Test
    void testGetAllCvsByFileName3() {
        Cv cv = mock(Cv.class);
        when(cv.toCvDTO()).thenReturn(new CvDTO());
        doNothing().when(cv).setFileName(Mockito.any());
        doNothing().when(cv).setFile_cv(Mockito.any());
        doNothing().when(cv).setId(anyLong());
        doNothing().when(cv).setMatricule(Mockito.any());
        doNothing().when(cv).setStatus(Mockito.any());
        cv.setFileName("foo.txt");
        cv.setFile_cv("AXAXAXAX".getBytes(StandardCharsets.UTF_8));
        cv.setId(1L);
        cv.setMatricule("Matricule");
        cv.setStatus(Cv.StatusCV.Accepted);

        ArrayList<Cv> cvList = new ArrayList<>();
        cvList.add(cv);
        when(cvRepository.getAllByFileName(Mockito.any())).thenReturn(cvList);
        assertEquals(1, gestionnaireService.getAllCvsByFileName("foo.txt").size());
        verify(cvRepository).getAllByFileName(Mockito.any());
        verify(cv).toCvDTO();
        verify(cv).setFileName(Mockito.any());
        verify(cv).setFile_cv(Mockito.any());
        verify(cv).setId(anyLong());
        verify(cv).setMatricule(Mockito.any());
        verify(cv).setStatus(Mockito.any());
    }


    @Test
    public void testGetStudentsWithEntrevue() {
        // Créer des étudiants
        Student student1 = new Student("Jean", "Dupont", "MAT123", "0101010101", "Programme1");
        Student student2 = new Student("Marie", "Doe", "MAT456", "0202020202", "Programme2");

        // Créer des entrevues pour ces étudiants
        Entrevue entrevue1 = new Entrevue();
        entrevue1.setStudent(student1);

        Entrevue entrevue2 = new Entrevue();
        entrevue2.setStudent(student2);

        // Mock le comportement du repository pour renvoyer les entrevues avec étudiants non nuls
        when(entrevueRepository.findByStudentNotNull()).thenReturn(Arrays.asList(entrevue1, entrevue2));

        // Appeler le service
        List<StudentGetDTO> result = gestionnaireService.getStudentsWithEntrevue();

        // Vérifications
        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(dto -> dto.getMatricule().equals("MAT123")));
        assertTrue(result.stream().anyMatch(dto -> dto.getMatricule().equals("MAT456")));
    }


}
