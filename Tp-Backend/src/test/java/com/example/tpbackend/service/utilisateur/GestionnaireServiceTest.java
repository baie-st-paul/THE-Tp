package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.CvDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.DTO.utilisateur.gestionnaire.GestionnairePostDTO;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.gestionnaire.Gestionnaire;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.repository.CvRepository;
import com.example.tpbackend.repository.OffreStageRepository;
import com.example.tpbackend.repository.utilisateur.GestionnaireRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;
import com.example.tpbackend.utils.ByteArrayMultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import java.util.ArrayList;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

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


}
