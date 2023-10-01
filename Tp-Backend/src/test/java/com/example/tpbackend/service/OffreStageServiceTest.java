package com.example.tpbackend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.OffreStageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class OffreStageServiceTest {

    @InjectMocks
    private OffreStageService offreStageService;

    @Mock
    private OffreStageRepository offreStageRepository;

    @Test
    public void testGetAllOffres() {
        List<OffreStage> offres = Arrays.asList(new OffreStage(), new OffreStage());
        when(offreStageRepository.findAll()).thenReturn(offres);

        List<OffreStage> result = offreStageService.getAllOffres();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetOffres() {
        List<OffreStage> offres = Arrays.asList(new OffreStage(), new OffreStage());
        when(offreStageRepository.findAll()).thenReturn(offres);

        List<OffreStageDTO> result = offreStageService.getOffres();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetOffreById() {
        OffreStage offre = new OffreStage();
        offre.setId(1L);
        when(offreStageRepository.findOffreById(1L)).thenReturn(Optional.of(offre));

        OffreStage result = offreStageService.getOffreById(1L).toOffreStage();

        assertEquals(1L, result.getId());
    }

    @Test
    public void testGetOffreById_NotFound() {
        when(offreStageRepository.findOffreById(1L)).thenReturn(Optional.empty());

        try {
            OffreStage result = offreStageService.getOffreById(1L).toOffreStage();
        } catch (RuntimeException e) {
            assertEquals("Offre de stage non trouvée pour l'ID : 1", e.getMessage());
        }
    }

    /**
     * Method under test: {@link OffreStageService#getOffresByEmployerId(Long)}
     */
    @Test
    void testGetOffresByEmployerId() {
        when(offreStageRepository.findAllByEmployer(Mockito.<Long>any())).thenReturn(new ArrayList<>());
        assertTrue(offreStageService.getOffresByEmployerId(1L).isEmpty());
        verify(offreStageRepository).findAllByEmployer(Mockito.<Long>any());
    }

    /**
     * Method under test: {@link OffreStageService#getOffresByEmployerId(Long)}
     */
    @Test
    void testGetOffresByEmployerId2() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);

        OffreStage offreStage = new OffreStage();
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");

        ArrayList<OffreStage> offreStageList = new ArrayList<>();
        offreStageList.add(offreStage);
        when(offreStageRepository.findAllByEmployer(Mockito.<Long>any())).thenReturn(offreStageList);
        assertEquals(1, offreStageService.getOffresByEmployerId(1L).size());
        verify(offreStageRepository).findAllByEmployer(Mockito.<Long>any());
    }

    /**
     * Method under test: {@link OffreStageService#getOffresByEmployerId(Long)}
     */
    @Test
    void testGetOffresByEmployerId3() {
        when(offreStageRepository.findAllByEmployer(Mockito.<Long>any())).thenThrow(new RuntimeException("foo"));
        assertThrows(RuntimeException.class, () -> offreStageService.getOffresByEmployerId(1L));
        verify(offreStageRepository).findAllByEmployer(Mockito.<Long>any());
    }

    /**
     * Method under test: {@link OffreStageService#getOffresByEmployerId(Long)}
     */
    @Test
    void testGetOffresByEmployerId4() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("jane.doe@example.org");
        utilisateur.setId(1L);
        utilisateur.setPassword("iloveyou");
        utilisateur.setRole(Utilisateur.Role.Student);

        Employer employer = new Employer();
        employer.setCompanyName("Company Name");
        employer.setFirstName("Jane");
        employer.setId(1L);
        employer.setLastName("Doe");
        employer.setOffresStages(new ArrayList<>());
        employer.setPhoneNumber("6625550144");
        employer.setUtilisateur(utilisateur);
        OffreStage offreStage = mock(OffreStage.class);
        when(offreStage.toOffreStageDTO()).thenReturn(new OffreStageDTO());
        doNothing().when(offreStage).setDateDebut(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDateFin(Mockito.<LocalDate>any());
        doNothing().when(offreStage).setDescription(Mockito.<String>any());
        doNothing().when(offreStage).setEmployer(Mockito.<Employer>any());
        doNothing().when(offreStage).setId(Mockito.<Long>any());
        doNothing().when(offreStage).setSalaire(Mockito.<Double>any());
        doNothing().when(offreStage).setStatus(Mockito.<OffreStage.Status>any());
        doNothing().when(offreStage).setStudentProgram(Mockito.<String>any());
        doNothing().when(offreStage).setTitre(Mockito.<String>any());
        offreStage.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage.setDescription("The characteristics of someone or something");
        offreStage.setEmployer(employer);
        offreStage.setId(1L);
        offreStage.setSalaire(10.0d);
        offreStage.setStatus(OffreStage.Status.Accepted);
        offreStage.setStudentProgram("Student Program");
        offreStage.setTitre("Titre");

        ArrayList<OffreStage> offreStageList = new ArrayList<>();
        offreStageList.add(offreStage);
        when(offreStageRepository.findAllByEmployer(Mockito.<Long>any())).thenReturn(offreStageList);
        assertEquals(1, offreStageService.getOffresByEmployerId(1L).size());
        verify(offreStageRepository).findAllByEmployer(Mockito.<Long>any());
        verify(offreStage).toOffreStageDTO();
        verify(offreStage).setDateDebut(Mockito.<LocalDate>any());
        verify(offreStage).setDateFin(Mockito.<LocalDate>any());
        verify(offreStage).setDescription(Mockito.<String>any());
        verify(offreStage).setEmployer(Mockito.<Employer>any());
        verify(offreStage).setId(Mockito.<Long>any());
        verify(offreStage).setSalaire(Mockito.<Double>any());
        verify(offreStage).setStatus(Mockito.<OffreStage.Status>any());
        verify(offreStage).setStudentProgram(Mockito.<String>any());
        verify(offreStage).setTitre(Mockito.<String>any());
    }
}
