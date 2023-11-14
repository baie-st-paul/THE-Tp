package com.example.tpbackend.service.utilisateur;

import com.example.tpbackend.DTO.ContratStageDTO;
import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.ContratStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.models.utilisateur.etudiant.Student;
import com.example.tpbackend.repository.ContratStageRepository;
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

        Student studentMock = mock(Student.class);
        Employer employeurMock = mock(Employer.class);

        when(studentMock.getMatricule()).thenReturn("matricule1");
        when(studentMock.getUtilisateur()).thenReturn(new Utilisateur());
        when(employeurMock.getId()).thenReturn(employeurId);

        contrat1.setStudent(studentMock);
        contrat1.setEmployeur(employeurMock);
        contrat1.setNomDePoste("Company Name");

        contrat2.setStudent(studentMock);
        contrat2.setEmployeur(employeurMock);
        contrat2.setNomDePoste("Company Name");

        List<ContratStage> contrats = Arrays.asList(contrat1, contrat2);
        when(contratStageRepository.findByEmployeur_Id(employeurId)).thenReturn(contrats);

        List<ContratStageDTO> result = employerService.getContratStageByEmployeur(employeurId);

        assertEquals(2, result.size());
        assertEquals("matricule1", result.get(0).getStudentId());
        assertEquals(employeurId, result.get(0).getEmployerId());
        assertEquals("Company Name", result.get(0).getNomDeCompany());
        assertEquals("matricule1", result.get(1).getStudentId());
        assertEquals(employeurId, result.get(1).getEmployerId());
        assertEquals("Company Name", result.get(1).getNomDeCompany());
    }

    @Test
    void testUpdateStatusContractSetViewedByEmployer(){
        ContratStage contratStage = new ContratStage();
        contratStage.setId(1L);
        contratStage.setStatusVuPasVuE(ContratStage.StatusVuPasVu.pasVu);
        contratStage.setStatusVuPasVuG(ContratStage.StatusVuPasVu.pasVu);
        contratStage.setStatusVuPasVuS(ContratStage.StatusVuPasVu.pasVu);

        doNothing().when(contratStageRepository).updateStatusVuPasVuEByMatricule("2222222", ContratStage.StatusVuPasVu.vu);
        employerService.updateStatusContratVuE("2222222", ContratStage.StatusVuPasVu.vu.toString());

        verify(contratStageRepository, times(1)).updateStatusVuPasVuEByMatricule("2222222", ContratStage.StatusVuPasVu.vu);
    }





}
