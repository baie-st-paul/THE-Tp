package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.EvaluationPdfDto;
import com.example.tpbackend.DTO.ContratStageDTO.ContratStageDTODetails;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.Candidature;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.EvaluationPDF;
import com.example.tpbackend.models.Cv;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.ContratStageRepository;
import com.example.tpbackend.repository.EvaluationPDFRepository;
import com.example.tpbackend.repository.utilisateur.EmployerRepository;
import com.example.tpbackend.repository.utilisateur.UtilisateurRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {EmployerService.class})
@ExtendWith(MockitoExtension.class)
class EmployerServiceTest {

    @InjectMocks
    private EmployerService employerService;
    @Mock
    private EmployerRepository employerRepository;

    @Mock
    ContratStageRepository contratStageRepository;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private EvaluationPDFRepository evaluationPDFRepository;

    /**
     * Method under test: {@link EmployerService#existByName(String)}
     */
    @Test
    void testExistByName() {
        when(employerRepository.existsByCompanyName(Mockito.<String>any())).thenReturn(true);
        assertTrue(employerService.existByName("Company Name"));
        verify(employerRepository).existsByCompanyName(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#existByName(String)}
     */
    @Test
    void testExistByName2() {
        when(employerRepository.existsByCompanyName(Mockito.<String>any())).thenReturn(false);
        assertFalse(employerService.existByName("Company Name"));
        verify(employerRepository).existsByCompanyName(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#existByEmail(String)}
     */
    @Test
    void testExistByEmail() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(true);
        assertTrue(employerService.existByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#existByEmail(String)}
     */
    @Test
    void testExistByEmail2() {
        when(utilisateurRepository.existsByEmail(Mockito.<String>any())).thenReturn(false);
        assertFalse(employerService.existByEmail("jane.doe@example.org"));
        verify(utilisateurRepository).existsByEmail(Mockito.<String>any());
    }

    /**
     * Method under test: {@link EmployerService#getOffreStageByEmployer(Long)}
     */
    @Test
    void testGetOffreStageByEmployer() {
        ArrayList<OffreStageDTO> offreStageDTOList = new ArrayList<>();
        when(employerRepository.getOffreStageById(Mockito.<Long>any())).thenReturn(offreStageDTOList);
        List<OffreStageDTO> actualOffreStageByEmployer = employerService.getOffreStageByEmployer(1L);
        assertSame(offreStageDTOList, actualOffreStageByEmployer);
        assertTrue(actualOffreStageByEmployer.isEmpty());
        verify(employerRepository).getOffreStageById(Mockito.<Long>any());
    }

    @Test
    void testGetContratStageByEmpleur() {
        Long employeurId = 1L;
        ContratStage contrat1 = new ContratStage();
        ContratStage contrat2 = new ContratStage();

        Utilisateur utilisateur = mock(Utilisateur.class);
        Employer employer = mock(Employer.class);
        when(employer.getUtilisateur()).thenReturn(utilisateur);

        OffreStage offreStage1 = mock(OffreStage.class);
        when(offreStage1.getEmployer()).thenReturn(employer);
        when(offreStage1.getTitre()).thenReturn("poste 1");
        when(offreStage1.getEmployer().getId()).thenReturn(employeurId);

        OffreStage offreStage2 = mock(OffreStage.class);
        when(offreStage2.getEmployer()).thenReturn(employer);
        when(offreStage2.getTitre()).thenReturn("poste 2");
        when(offreStage2.getEmployer().getId()).thenReturn(employeurId);

        Cv cv = mock(Cv.class);

        Candidature candidatureMock1 = mock(Candidature.class);
        when(candidatureMock1.getId()).thenReturn(1L);
        when(candidatureMock1.getCvStudent()).thenReturn(cv);
        when(candidatureMock1.getOffreStage()).thenReturn(offreStage1);

        Candidature candidatureMock2 = mock(Candidature.class);
        when(candidatureMock2.getId()).thenReturn(2L);
        when(candidatureMock2.getCvStudent()).thenReturn(cv);
        when(candidatureMock2.getOffreStage()).thenReturn(offreStage2);

        contrat1.setCandidature(candidatureMock1);
        contrat1.setNomDePoste("poste 1");
        contrat1.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        contrat1.setStatutEmployeur(ContratStage.Statut.Pas_Signer);
        contrat1.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);
        contrat1.setStatutVuPasVuG(ContratStage.StatusVuPasVu.pasVu);
        contrat1.setStatutVuPasVuE(ContratStage.StatusVuPasVu.pasVu);
        contrat1.setStatutVuPasVuS(ContratStage.StatusVuPasVu.pasVu);

        contrat2.setCandidature(candidatureMock2);
        contrat2.setNomDePoste("poste 2");
        contrat2.setStatutEtudiant(ContratStage.Statut.Pas_Signer);
        contrat2.setStatutEmployeur(ContratStage.Statut.Pas_Signer);
        contrat2.setStatutGestionnaire(ContratStage.Statut.Pas_Signer);
        contrat2.setStatutVuPasVuG(ContratStage.StatusVuPasVu.pasVu);
        contrat2.setStatutVuPasVuE(ContratStage.StatusVuPasVu.pasVu);
        contrat2.setStatutVuPasVuS(ContratStage.StatusVuPasVu.pasVu);

        List<ContratStage> contrats = Arrays.asList(contrat1, contrat2);
        when(contratStageRepository.findByEmployeur_Id(employeurId)).thenReturn(contrats);

        List<ContratStageDTODetails> result = employerService.getContratStageByEmployeur(employeurId);

        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getCandidatureDTO().getId());
        assertEquals("poste 1", result.get(0).getCandidatureDTO().getOffreStage().getTitre());
        assertEquals(2L, result.get(1).getCandidatureDTO().getId());
        assertEquals("poste 2", result.get(1).getCandidatureDTO().getOffreStage().getTitre());
    }

    @Test
    public void testSaveEvaluation() throws Exception {
        //1.On Crée un faux contenu de fichier pour simuler le PDF.
        byte[] fakePdfContent = "pdf content".getBytes();
        MultipartFile mockFile = mock(MultipartFile.class); // On crée un mock de MultipartFile.

        //2. On simule le comportement du fichier multipart.
        when(mockFile.getOriginalFilename()).thenReturn("evaluation.pdf");
        when(mockFile.getBytes()).thenReturn(fakePdfContent);

        //3. On crée un DTO avec le fichier mocké.
        EvaluationPdfDto evaluationPdfDto = new EvaluationPdfDto(mockFile);

        //4. simule le comportement du repository.
        EvaluationPDF evaluationPDF = new EvaluationPDF();
        evaluationPDF.setName(evaluationPdfDto.getName());
        evaluationPDF.setContent(evaluationPdfDto.getContent());
        when(evaluationPDFRepository.save(any(EvaluationPDF.class))).thenReturn(evaluationPDF);

        //5. On appel la méthode à tester.
        EvaluationPdfDto savedDto = employerService.saveEvaluation(evaluationPdfDto);

        //6. On vérifie que le nom du fichier est correct.
        assertEquals("evaluation.pdf", savedDto.getName());

        //7. On vérifie que le contenu est bien transmis et enregistré.
        verify(evaluationPDFRepository).save(argThat(savedEvaluation ->
                Arrays.equals(fakePdfContent, savedEvaluation.getContent()) &&
                        "evaluation.pdf".equals(savedEvaluation.getName())
        ));
    }

    @Test
    public void testUpdateStatusContractSetViewedByEmployer() {
        ContratStage contratStage = new ContratStage();
        contratStage.setId(1L);
        contratStage.setStatutVuPasVuE(ContratStage.StatusVuPasVu.pasVu);
        contratStage.setStatutVuPasVuG(ContratStage.StatusVuPasVu.pasVu);
        contratStage.setStatutVuPasVuS(ContratStage.StatusVuPasVu.pasVu);

        doNothing().when(contratStageRepository).updateStatusVuPasVuEByMatricule("2222222", ContratStage.StatusVuPasVu.vu);
        employerService.updateStatusContratVuE("2222222", ContratStage.StatusVuPasVu.vu.toString());

        verify(contratStageRepository, times(1)).updateStatusVuPasVuEByMatricule("2222222", ContratStage.StatusVuPasVu.vu);
    }
}




