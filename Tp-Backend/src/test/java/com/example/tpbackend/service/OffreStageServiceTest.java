package com.example.tpbackend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.tpbackend.DTO.OffreStageDTO;
import com.example.tpbackend.models.OffreStage;
import com.example.tpbackend.models.utilisateur.Utilisateur;
import com.example.tpbackend.models.utilisateur.employeur.Employer;
import com.example.tpbackend.repository.OffreStageRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Disabled;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {OffreStageService.class})
@ExtendWith(SpringExtension.class)
class OffreStageServiceTest {
    @MockBean
    private OffreStageRepository offreStageRepository;

    @Autowired
    private OffreStageService offreStageService;

    /**
     * Method under test: {@link OffreStageService#createOffre(OffreStageDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testCreateOffre() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Name is null
        //       at java.lang.Enum.valueOf(Enum.java:271)
        //       at com.example.tpbackend.models.OffreStage$Status.valueOf(OffreStage.java:62)
        //       at com.example.tpbackend.models.OffreStage.<init>(OffreStage.java:47)
        //       at com.example.tpbackend.DTO.OffreStageDTO.toOffreStage(OffreStageDTO.java:26)
        //       at com.example.tpbackend.service.OffreStageService.createOffre(OffreStageService.java:25)
        //   See https://diff.blue/R013 to resolve this issue.

        offreStageService.createOffre(new OffreStageDTO());
    }

    /**
     * Method under test: {@link OffreStageService#createOffre(OffreStageDTO)}
     */
    @Test
    void testCreateOffre2() {
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
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenReturn(offreStage);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setFirstName("Jane");
        employer2.setId(1L);
        employer2.setLastName("Doe");
        employer2.setOffresStages(new ArrayList<>());
        employer2.setPhoneNumber("6625550144");
        employer2.setUtilisateur(utilisateur2);

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setEmployer(employer2);
        offreStage2.setId(1L);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");
    }

    /**
     * Method under test: {@link OffreStageService#createOffre(OffreStageDTO)}
     */
    @Test
    void testCreateOffre3() {
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
        OffreStageDTO offreStageDTO = new OffreStageDTO();
        when(offreStage.toOffreStageDTO()).thenReturn(offreStageDTO);
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
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenReturn(offreStage);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setFirstName("Jane");
        employer2.setId(1L);
        employer2.setLastName("Doe");
        employer2.setOffresStages(new ArrayList<>());
        employer2.setPhoneNumber("6625550144");
        employer2.setUtilisateur(utilisateur2);

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setEmployer(employer2);
        offreStage2.setId(1L);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");
    }

    /**
     * Method under test: {@link OffreStageService#getAllOffres()}
     */
    @Test
    void testGetAllOffres() {
        ArrayList<OffreStage> offreStageList = new ArrayList<>();
        when(offreStageRepository.findAll()).thenReturn(offreStageList);
        List<OffreStage> actualAllOffres = offreStageService.getAllOffres();
        assertSame(offreStageList, actualAllOffres);
        assertTrue(actualAllOffres.isEmpty());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getAllOffres()}
     */
    @Test
    void testGetAllOffres2() {
        when(offreStageRepository.findAll()).thenThrow(new RuntimeException("foo"));
        assertThrows(RuntimeException.class, () -> offreStageService.getAllOffres());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres() {
        when(offreStageRepository.findAll()).thenReturn(new ArrayList<>());
        assertTrue(offreStageService.getOffres().isEmpty());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres2() {
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
        when(offreStageRepository.findAll()).thenReturn(offreStageList);
        assertEquals(1, offreStageService.getOffres().size());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres3() {
        when(offreStageRepository.findAll()).thenThrow(new RuntimeException("foo"));
        assertThrows(RuntimeException.class, () -> offreStageService.getOffres());
        verify(offreStageRepository).findAll();
    }

    /**
     * Method under test: {@link OffreStageService#getOffres()}
     */
    @Test
    void testGetOffres4() {
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
        when(offreStageRepository.findAll()).thenReturn(offreStageList);
        assertEquals(1, offreStageService.getOffres().size());
        verify(offreStageRepository).findAll();
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

    /**
     * Method under test: {@link OffreStageService#convertToDto(OffreStage)}
     */
    @Test
    void testConvertToDto() {
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
        assertEquals("The characteristics of someone or something",
                offreStageService.convertToDto(offreStage).getDescription());
    }

    /**
     * Method under test: {@link OffreStageService#convertToDto(OffreStage)}
     */
    @Test
    void testConvertToDto2() {
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
        when(offreStage.getDescription()).thenReturn("The characteristics of someone or something");
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
        assertEquals("The characteristics of someone or something",
                offreStageService.convertToDto(offreStage).getDescription());
        verify(offreStage).getDescription();
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

    /**
     * Method under test: {@link OffreStageService#getOffreById(Long)}
     */
    @Test
    void testGetOffreById() {
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
        Optional<OffreStage> ofResult = Optional.of(offreStage);
        when(offreStageRepository.findOffreById(Mockito.<Long>any())).thenReturn(ofResult);
        OffreStageDTO actualOffreById = offreStageService.getOffreById(1L);
        assertEquals("1970-01-01", actualOffreById.getDateDebut().toString());
        assertEquals("Titre", actualOffreById.getTitre());
        assertEquals("Student Program", actualOffreById.getStudentProgram());
        assertEquals("Accepted", actualOffreById.getStatus());
        assertEquals(10.0d, actualOffreById.getSalaire());
        assertEquals("The characteristics of someone or something", actualOffreById.getDescription());
        assertEquals("1970-01-01", actualOffreById.getDateFin().toString());
        verify(offreStageRepository).findOffreById(Mockito.<Long>any());
    }

    /**
     * Method under test: {@link OffreStageService#getOffreById(Long)}
     */
    @Test
    void testGetOffreById2() {
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
        OffreStageDTO offreStageDTO = new OffreStageDTO();
        when(offreStage.toOffreStageDTO()).thenReturn(offreStageDTO);
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
        Optional<OffreStage> ofResult = Optional.of(offreStage);
        when(offreStageRepository.findOffreById(Mockito.<Long>any())).thenReturn(ofResult);
        assertSame(offreStageDTO, offreStageService.getOffreById(1L));
        verify(offreStageRepository).findOffreById(Mockito.<Long>any());
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

    /**
     * Method under test: {@link OffreStageService#getOffreById(Long)}
     */
    @Test
    void testGetOffreById3() {
        Optional<OffreStage> emptyResult = Optional.empty();
        when(offreStageRepository.findOffreById(Mockito.<Long>any())).thenReturn(emptyResult);
        assertThrows(RuntimeException.class, () -> offreStageService.getOffreById(1L));
        verify(offreStageRepository).findOffreById(Mockito.<Long>any());
    }

    /**
     * Method under test: {@link OffreStageService#updateOffreStage(OffreStageDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testUpdateOffreStage() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Name is null
        //       at java.lang.Enum.valueOf(Enum.java:271)
        //       at com.example.tpbackend.models.OffreStage$Status.valueOf(OffreStage.java:62)
        //       at com.example.tpbackend.models.OffreStage.<init>(OffreStage.java:47)
        //       at com.example.tpbackend.DTO.OffreStageDTO.toOffreStage(OffreStageDTO.java:26)
        //       at com.example.tpbackend.service.OffreStageService.createOffre(OffreStageService.java:25)
        //       at com.example.tpbackend.service.OffreStageService.updateOffreStage(OffreStageService.java:55)
        //   See https://diff.blue/R013 to resolve this issue.

        offreStageService.updateOffreStage(new OffreStageDTO());
    }

    /**
     * Method under test: {@link OffreStageService#updateOffreStage(OffreStageDTO)}
     */
    @Test
    void testUpdateOffreStage2() {
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
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenReturn(offreStage);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setFirstName("Jane");
        employer2.setId(1L);
        employer2.setLastName("Doe");
        employer2.setOffresStages(new ArrayList<>());
        employer2.setPhoneNumber("6625550144");
        employer2.setUtilisateur(utilisateur2);

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setEmployer(employer2);
        offreStage2.setId(1L);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");
        OffreStageDTO offreStageDTO = mock(OffreStageDTO.class);
        when(offreStageDTO.toOffreStage()).thenReturn(offreStage2);
    }

    /**
     * Method under test: {@link OffreStageService#updateOffreStage(OffreStageDTO)}
     */
    @Test
    void testUpdateOffreStage3() {
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
        OffreStageDTO offreStageDTO = new OffreStageDTO();
        when(offreStage.toOffreStageDTO()).thenReturn(offreStageDTO);
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
        when(offreStageRepository.save(Mockito.<OffreStage>any())).thenReturn(offreStage);

        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setEmail("jane.doe@example.org");
        utilisateur2.setId(1L);
        utilisateur2.setPassword("iloveyou");
        utilisateur2.setRole(Utilisateur.Role.Student);

        Employer employer2 = new Employer();
        employer2.setCompanyName("Company Name");
        employer2.setFirstName("Jane");
        employer2.setId(1L);
        employer2.setLastName("Doe");
        employer2.setOffresStages(new ArrayList<>());
        employer2.setPhoneNumber("6625550144");
        employer2.setUtilisateur(utilisateur2);

        OffreStage offreStage2 = new OffreStage();
        offreStage2.setDateDebut(LocalDate.of(1970, 1, 1));
        offreStage2.setDateFin(LocalDate.of(1970, 1, 1));
        offreStage2.setDescription("The characteristics of someone or something");
        offreStage2.setEmployer(employer2);
        offreStage2.setId(1L);
        offreStage2.setSalaire(10.0d);
        offreStage2.setStatus(OffreStage.Status.Accepted);
        offreStage2.setStudentProgram("Student Program");
        offreStage2.setTitre("Titre");
        OffreStageDTO offreStageDTO2 = mock(OffreStageDTO.class);
        when(offreStageDTO2.toOffreStage()).thenReturn(offreStage2);
    }

    /**
     * Method under test: {@link OffreStageService#deleteOffreStage(OffreStageDTO)}
     */
    @Test
    @Disabled("TODO: Complete this test")
    void testDeleteOffreStage() {
        // TODO: Complete this test.
        //   Reason: R013 No inputs found that don't throw a trivial exception.
        //   Diffblue Cover tried to run the arrange/act section, but the method under
        //   test threw
        //   java.lang.NullPointerException: Name is null
        //       at java.lang.Enum.valueOf(Enum.java:271)
        //       at com.example.tpbackend.models.OffreStage$Status.valueOf(OffreStage.java:62)
        //       at com.example.tpbackend.models.OffreStage.<init>(OffreStage.java:47)
        //       at com.example.tpbackend.DTO.OffreStageDTO.toOffreStage(OffreStageDTO.java:26)
        //       at com.example.tpbackend.service.OffreStageService.deleteOffreStage(OffreStageService.java:59)
        //   See https://diff.blue/R013 to resolve this issue.

        offreStageService.deleteOffreStage(new OffreStageDTO());
    }

    /**
     * Method under test: {@link OffreStageService#deleteOffreStage(OffreStageDTO)}
     */
    @Test
    void testDeleteOffreStage2() {
        doNothing().when(offreStageRepository).delete(Mockito.<OffreStage>any());

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
        OffreStageDTO offreStageDTO = mock(OffreStageDTO.class);
        when(offreStageDTO.toOffreStage()).thenReturn(offreStage);
        offreStageService.deleteOffreStage(offreStageDTO);
        verify(offreStageRepository).delete(Mockito.<OffreStage>any());
        verify(offreStageDTO).toOffreStage();
        assertTrue(offreStageService.getAllOffres().isEmpty());
    }
}

